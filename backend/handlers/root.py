"""Handler(s) for the root route"""

def read_root():
    """Return a simple health/status response used at GET '/'."""
    return {"Hello": "World", "status": "Firebase connected", "test":"test"}
