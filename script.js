// MQTT Configuration
       const clientId = 'ledcontrol_' + Math.random().toString(16).substr(2, 8);
       const broker = 'wss://broker.hivemq.com:8884/mqtt';
        
       // Create unique topic prefix to avoid conflicts
       const topicPrefix = `ficilabs/`;
       const ledTopic = topicPrefix + 'led';
       const tempTopic = topicPrefix + 'temp';
       const humTopic = topicPrefix + 'hum';
        
       let client;
       let ledState = false;
       
       // Connect to MQTT broker
       function connectMQTT() {
            console.log('Connecting to HiveMQ...');
            
            client = mqtt.connect(broker, {
                host: 'broker.hivemq.com',
                port: 8884,
                protocol: 'wss',
                clientId: clientId,
                clean: true,
                reconnectPeriod: 1000,
                connectTimeout: 30 * 1000
            });

            client.on('connect', () => {
                showAlert({ color: 'bg-green-500', icon: 'fas fa-check-circle', message: 'Connected' });
                
                // Subscribe to LED status topic
                client.subscribe([ledTopic, tempTopic]);
            });

            client.on('message', (topic, message) => {
                if(topic == 'ficilabs/led'){
                    console.log(message.toString())
                    console.log(topic)
                }else if(topic == 'ficilabs/temp'){
                    console.log(message.toString())
                    console.log(topic)
                    updateIconTemp(message.toString())
                }else if(topic == 'ficilabs/hum'){
                    console.log(message.toString())
                    console.log(topic)
                    updateIconHum(message.toString())
                }
            });

            client.on('error', (error) => {
                showAlert({ color: 'bg-red-500', icon: 'fas fa-exclamation-circle', message: 'Error' });
            });

            client.on('offline', () => {
                showAlert({ color: 'bg-yellow-500', icon: 'fas fa-exclamation-triangle', message: 'Offline' });
            });
        }
        
      // Reusable function to toggle a light
        function toggleLight(lightId) {
            const lightStatus = document.getElementById(`light-status-${lightId}`);
            const lightIcon = document.getElementById(`light-icon-${lightId}`);
            const toggleSwitch = document.getElementById(`toggle-switch-${lightId}`);
            const isOn = lightStatus.innerText === 'ON';
            
            // Update UI elements
            lightStatus.innerText = isOn ? 'OFF' : 'ON';
            lightIcon.classList.toggle('text-yellow-500', !isOn);
            lightIcon.classList.toggle('text-gray-600', isOn);
            toggleSwitch.classList.toggle('on', !isOn);
            
            // Publish MQTT message
            const message = isOn ? 'off' : 'on';
            const topic = ledTopic + `${lightId}`;  // Different topics for different lights
            
            client.publish(topic, message, { qos: 0, retain: false }, (error) => {
                if (error) {
                    console.error('Publish error:', error);
                } else {
                    console.log(`Published: ${message} to ${topic}`);
                }
            });
        }

        function updateIconTemp(value) {
            const temperatureValue = value; // Example temperature value
            document.getElementById('temp').innerHTML = temperatureValue + '°C';

            const temperatureIcon = document.getElementById('temperature-icon');

            // Update temperature icon color
            if (temperatureValue < 15) {
                temperatureIcon.classList.add('text-blue-500');
                temperatureIcon.classList.remove('text-yellow-500', 'text-red-500');
            } else if (temperatureValue >= 15 && temperatureValue <= 25) {
                temperatureIcon.classList.add('text-yellow-500');
                temperatureIcon.classList.remove('text-blue-500', 'text-red-500');
            } else {
                temperatureIcon.classList.add('text-red-500');
                temperatureIcon.classList.remove('text-blue-500', 'text-yellow-500');
            }
        }
        
        function updateIconHum(){
            const humidityValue = 100; // Example humidity value
            document.getElementById('hum').innerHTML = humidityValue + '%';
            
            const humidityIcon = document.getElementById('humidity-icon');
            
            // Update humidity icon color
            if (humidityValue < 30) {
                humidityIcon.classList.add('text-blue-500');
                humidityIcon.classList.remove('text-green-500', 'text-red-500');
            } else if (humidityValue >= 30 && humidityValue <= 60) {
                humidityIcon.classList.add('text-green-500');
                humidityIcon.classList.remove('text-blue-500', 'text-red-500');
            } else {
                humidityIcon.classList.add('text-red-500');
                humidityIcon.classList.remove('text-blue-500', 'text-green-500');
            }
        }
        
        function showAlert(type) {
            const alertBox = document.getElementById('alert-box');
            alertBox.classList.remove('bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500');
            alertBox.classList.add(type.color);
            alertBox.innerHTML = `<i class="${type.icon}"></i><span>${type.message}</span>`;
            if (type.message === 'Connected') {
                setTimeout(() => {
                    alertBox.classList.add('hidden');
                }, 2000);
            } else {
                alertBox.classList.remove('hidden');
            }
        }
        
        // Connect when page loads
        connectMQTT();
