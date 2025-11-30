class Location:
    def __init__(self, city: str, province: str, country: str):
        self.city = city
        self.province = province
    
    @classmethod
    def from_string(cls, loc_str: str):
        parts = [p.strip() for p in loc_str.split(",")]

        if len(parts) == 2:
            #if DB only has "City, Province"
            return cls(parts[0], parts[1])

        raise ValueError(f"Invalid location format: {loc_str}")
        