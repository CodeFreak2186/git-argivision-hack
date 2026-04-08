import time
import requests
import random
import json
import os

# Configuration
SERVER_URL = "http://localhost:5000" # Change to your central server IP
UPDATE_INTERVAL = 0.5 # Seconds

# If using real Pixhawk, uncomment the lines below and run 'pip install pymavlink pyserial'
# from pymavlink import mavutil
# connection = mavutil.mavlink_connection('/dev/ttyAMA0', baud=57600) # Serial connection example

def get_drone_data():
    """
    Retrieves data from sensors or Pixhawk.
    Currently simulates data for the UI demonstration.
    """
    # Placeholder for real Pixhawk extraction:
    # msg = connection.recv_match(type='GLOBAL_POSITION_INT', blocking=False)
    # if msg: return {"altitude": msg.relative_alt / 1000.0, ...}
    
    return {
        "altitude": round(random.uniform(5.0, 15.0), 2),
        "battery": random.randint(70, 99),
        "health": "Normal",
        "status": "Scanning Orchard",
        "heading": random.randint(0, 359),
        "pitch": round(random.uniform(-5.0, 5.0), 2),
        "roll": round(random.uniform(-5.0, 5.0), 2),
        "gnss_satellites": random.randint(10, 18),
        "climb_rate": round(random.uniform(-0.5, 0.5), 2),
        "ground_speed": round(random.uniform(0.5, 3.0), 2),
        "flight_mode": random.choice(["AUTO", "GUIDED", "LOITER"]),
        "cpu_load": random.randint(20, 45)
    }

def main():
    print("====================================")
    print(" MANGOVISION RASPBERRY-DRONE LINK   ")
    print("====================================")
    print(f"Target Server: {SERVER_URL}")
    print("Starting telemetry loop...")

    try:
        while True:
            data = get_drone_data()
            try:
                # POST data to central server
                requests.post(f"{SERVER_URL}/update_telemetry", json=data, timeout=1)
                print(f"[SENT] Alt: {data['altitude']}m | Bat: {data['battery']}% | Mode: {data['flight_mode']}")
            except Exception as e:
                print(f"[ERROR] Could not reach server: {e}")
            
            time.sleep(UPDATE_INTERVAL)
            
    except KeyboardInterrupt:
        print("\nDrone link terminated by user.")

if __name__ == "__main__":
    main()
