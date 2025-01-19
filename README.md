# IoT Dashboard

A simple web-based IoT dashboard for monitoring temperature, humidity, and controlling multiple lights using MQTT protocol.

## Features

- Real-time temperature and humidity monitoring
- Three independent light controls
- MQTT communication with HiveMQ broker
- Responsive design using Tailwind CSS
- Connection status alerts

## Setup

1. Clone the repository
2. Open `index.html` in a web browser
3. The dashboard will automatically connect to HiveMQ broker

## Dependencies

- Tailwind CSS (via CDN)
- MQTT.js (v4.3.7)
- Font Awesome (v5.15.3)
- Google Fonts (Roboto)

## MQTT Topics

- LED Control: `ficilabs/led1`, `ficilabs/led2`, `ficilabs/led3`
- Temperature: `ficilabs/temp`
- Humidity: `ficilabs/hum`

## License

© 2025 Fici Labs. All rights reserved.
