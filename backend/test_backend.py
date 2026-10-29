import urllib.request
import urllib.parse
import json

BASE = "http://127.0.0.1:5000"

def test_health():
    with urllib.request.urlopen(f"{BASE}/api/health") as res:
        data = json.loads(res.read().decode())
        print("[TEST 1 - Health]:", data)
        assert data['status'] == 'ok'
        assert data['service'] == 'NEXTFLIX Streaming API'

def test_users_json_count():
    with open("backend/users.json", "r", encoding="utf-8") as f:
        users = json.load(f)
    regular_users = [u for u in users if u['role'] == 'user']
    admin_users = [u for u in users if u['role'] == 'admin']
    print(f"[TEST 2 - User Count]: {len(regular_users)} regular users, {len(admin_users)} admin users")
    assert len(regular_users) == 10, f"Expected 10 regular users, got {len(regular_users)}"
    assert len(admin_users) == 1, f"Expected 1 admin user, got {len(admin_users)}"

    expected_usernames = ["varun", "issac", "navven", "prajeen"]
    found = [u['username'] for u in regular_users]
    for exp in expected_usernames:
        assert exp in found, f"Missing required user {exp}"
        u = next(x for x in regular_users if x['username'] == exp)
        assert u['password'] == "demo@1234", f"Wrong password for {exp}"
    print("  -> All 4 specified users verified with demo@1234")

def test_login(username, password, expect_role=None, expect_fail=False):
    payload = json.dumps({"username": username, "password": password}).encode()
    req = urllib.request.Request(
        f"{BASE}/api/login",
        data=payload,
        headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req) as res:
            data = json.loads(res.read().decode())
            if expect_fail:
                raise AssertionError(f"Expected login to fail for {username}")
            print(f"[TEST 3 - Login {username}]: Success, role={data['user']['role']}, token={data['token'][:8]}...")
            if expect_role:
                assert data['user']['role'] == expect_role
            return data['token']
    except urllib.error.HTTPError as e:
        if expect_fail and e.code == 401:
            print(f"[TEST 3 - Login {username}]: Failed as expected (HTTP 401)")
            return None
        raise

def test_streaming():
    movies = ["dude", "dragon", "lik", "amaran", "adipurush", "sita-ramam", "moonu", "ponniyin-selvan"]
    print("[TEST 4 - Streaming 8 Allowlisted Movies with Range Requests]:")
    for m in movies:
        req = urllib.request.Request(
            f"{BASE}/api/stream/{m}",
            headers={"Range": "bytes=0-1024"}
        )
        with urllib.request.urlopen(req) as res:
            code = res.status
            content_range = res.headers.get("Content-Range")
            content_len = len(res.read())
            print(f"  -> Movie '{m}': HTTP {code}, Content-Range: {content_range}, bytes read: {content_len}")
            assert code == 206, f"Expected 206 Partial Content, got {code}"
            assert content_len == 1025

def test_non_allowlisted_streaming():
    print("[TEST 5 - Non-Allowlisted Video Streaming (Database Not Connected)]:")
    req = urllib.request.Request(f"{BASE}/api/stream/nonexistent-movie")
    try:
        with urllib.request.urlopen(req) as res:
            raise AssertionError("Non-allowlisted movie should not return 200")
    except urllib.error.HTTPError as e:
        assert e.code == 404
        data = json.loads(e.read().decode())
        print(f"  -> HTTP 404 returned correctly: error='{data.get('error')}'")
        assert data.get('error') == "Database Not Connected"

if __name__ == '__main__':
    test_health()
    test_users_json_count()
    # Test all 4 specified users
    for user in ["varun", "issac", "navven", "prajeen"]:
        test_login(user, "demo@1234", expect_role="user")
    # Test admin
    admin_token = test_login("admin", "admin@1234", expect_role="admin")
    # Test invalid login
    test_login("varun", "wrongpassword", expect_fail=True)
    # Test 6 movies streaming
    test_streaming()
    # Test non allowlisted
    test_non_allowlisted_streaming()
    print("\nALL BACKEND TESTS PASSED SUCCESSFULLY! [OK]")
