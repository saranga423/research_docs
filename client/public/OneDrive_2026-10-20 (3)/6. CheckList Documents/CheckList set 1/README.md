
# final-research

An advanced AI-powered autonomous drone system designed to revolutionise agricultural pollination for pumpkin farms in Sri Lanka and similar tropical regions. This system addresses critical challenges of manual pollination, including labor intensity, timing precision, pollinator decline, and climate variability.

1. Overview

The Smart Pollination Assistant is an AI-driven precision agriculture system designed to solve one of the most critical challenges in pumpkin farming: accurate and timely pollination.

Pumpkin pollination is highly time-sensitive—female flowers are receptive for only 2–4 hours in the early morning. Current practices rely on manual visual inspection, which is labor-intensive, error-prone, and often leads to missed pollination windows and yield loss.

This project introduces an end-to-end intelligent solution that combines computer vision, IoT sensing, mobile applications, and cloud services to detect flower readiness in real time and guide farmers toward optimal pollination decisions.

What This System Does

Detects pumpkin flower gender and pollination readiness using AI (YOLO + CNN)
Monitors environmental conditions via IoT sensors (temperature, humidity, light, soil moisture)
Processes data in real time through a cloud-based backend
Notifies farmers instantly through a mobile application
Continuously improves accuracy using active learning and user feedback

Core Components

-- Pollination Readiness Intelligence

Computer vision identifies flower stages (closed / open / ready)
Gender detection distinguishes male vs female flowers
ML models optimized for real-time inference

-- IoT & Environmental Monitoring

ESP32-based sensor nodes collect field data
Weather-aware decision support improves timing accuracy
MQTT/HTTP used for reliable data transmission

-- Cloud & Backend Services

FastAPI-based REST services for inference and data ingestion
Central database for sensor, image, and prediction history
Secure authentication and role-based access

-- Mobile Application

Flutter app for camera capture and live predictions
Dashboard with analytics, alerts, and pollination windows
Farmer feedback loop for model improvement

2. Key Features

Autonomous Navigation

RTK-GPS enabled precision positioning (±2cm)
Waypoint-based flight planning
Real-time obstacle avoidance
Automatic return-to-home on low battery
Geofencing for safe operation zones

AI-Powered Flower Detection

YOLOv8-based object detection model
Male/female flower classification
Receptivity assessment using visual cues
3D position calculation with depth sensing
Processing speed: 60fps @ 1080p

Smart Pollination

Two pollination methods:

Brush-based: Servo-controlled mechanical arm with soft bristles
Contactless: Charged particle or soap bubble delivery

Real-time mechanism adjustment
Pollen level monitoring
Success rate tracking

Data Intelligence

GPS-tagged pollination events
Environmental condition logging (temp, humidity, light)
Historical pattern analysis
Yield prediction algorithms
Field productivity heatmaps

Ground Control Station

Live video feed monitoring
Real-time telemetry dashboard
Mission planning interface
Emergency controls
Post-flight analytics and reporting

# Smart Pollination Assistant for Pumpkin Farming
This is a skeleton repository for the Smart Pollination Assistant project combining IoT, Flutter, and backend development. 

## Structure
- iot-device: Arduino/ESP32 code and circuit diagrams
- flutter-app: Flutter mobile app for farmers
- backend-api: Node.js / Firebase API
- datasets: Raw and processed sensor data
- analysis: Python notebooks and graphs
- results: Photos, videos, and evaluation reports
- docs: Research documentation
- references: Papers and datasheets
- project-files: Posters, diagrams, and visuals
  
# Tech Stack

| Layer     | Technologies                       |
| --------- | ---------------------------------- |
| AI / ML   | YOLO, CNN, PyTorch                 |
| Backend   | FastAPI, Python                    |
| IoT       | ESP32, DHT22, BH1750, Soil Sensors |
| Mobile    | Flutter                            |
| Messaging | MQTT                               |
| Database  | Firebase                           |
| Hardware  | Camera module, Rover/Robot         |

# Setup & Installation

 Backend (FastAPI)
 ```
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

```
API runs at:

http://localhost:8000

ML Training

```
cd ml-training
pip install -r requirements.txt
python train_readiness.py
```

Flutter App

```
cd flutter-app
flutter pub get
flutter run
```


# flutter_app




# architecture diagram

![diagram](https://github.com/user-attachments/assets/b966360c-0ba0-4a9b-811e-1ee9b856e896)





