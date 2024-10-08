class LeafletMap {

    constructor(containerId, center, zoom) {
        this.map = L.map(containerId).setView(center, zoom);
        this.initTileLayer();

        this.attendanceCountBNL = 0;
        this.attendanceCountAS = 0;
        this.attendanceCountDS = 0;

        this.markerCounts = {};
        this.markers = [];

        this.loggedData = []; 

        
        this.btn = document.getElementById('btn');
        this.btn1 = document.getElementById('btn1');
        this.btn2 = document.getElementById('btn2');
        this.btnclear = document.getElementById('btnclear');
        this.logCountElement = document.getElementById('logCountBNL');
        this.logCount1Element = document.getElementById('logCountAS');
        this.logCount2Element = document.getElementById('logCountDS');
        this.idContainer = document.getElementById('logContainer');

      
        this.btn.addEventListener('click', () => this.dataBNL());
        this.btn1.addEventListener('click', () => this.dataAS());
        this.btn2.addEventListener('click', () => this.dataDS());
        this.btnclear.addEventListener('click', () => this.clearLogs());

    }


    initTileLayer() {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

    addMarker(lat, lng, message) {
        const marker = L.marker([lat, lng]).addTo(this.map);
        marker.bindPopup(message);
    }

    updateMarkerPopup(marker, message) {
        const count = this.markerCounts[message];
        marker.bindPopup(`${message}<br>Attendance logs: ${count}`).openPopup();
    }

    loadMarkersFromJson(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(marker => {
                    this.addMarker(marker.latitude, marker.longitude, marker.message);
                });
            })
            .catch(error => console.error('Error loading markers:', error));
        }
        
    clearLogs(){
        this.attendanceCountBNL = 0;
        this.attendanceCountAS = 0;
        this.attendanceCountDS = 0;

        this.loggedData = [];
        this.markerCounts = {}; 
        this.markers.forEach(marker => {
            const message = marker.getPopup().getContent().split('<br>')[0]; 
            this.markerCounts[message] = 0;
            this.updateMarkerPopup(marker, message); 
        });

        this.updateLogDisplay();
    }

    displayLogCount() {      
        this.logCountElement.innerHTML = `BNL Attendance: ${this.attendanceCountBNL}`;
        this.logCount1Element.innerHTML = `AS Building Attendance: ${this.attendanceCountAS}`;
        this.logCount2Element.innerHTML = `DS Laboratory Attendance: ${this.attendanceCountDS}`;
   }

   dataBNL() {
    this.addMarker(8.577188,124.928062, 'BNL');
    this.attendanceCountbnl++; 
    this.updateLogDisplay();
}

   dataAS() {
    this.addMarker(8.577390,124.928073, 'AS');
    this.attendanceCountbnl++; 
    this.updateLogDisplay();
   }
    
   dataDS() {
    this.addMarker(8.578753,124.928041, 'DS');
    this.attendanceCountbnl++; 
    this.updateLogDisplay();
   }
const myMap = new LeafletMap('map', [8.578109, 124.927519], 18);



myMap.addMarker(8.577188,124.928062, 'Balay ni lalang');
myMap.addMarker(8.577390,124.928073, 'Adlawan store');
myMap.addMarker(8.578753,124.928041, 'Domo store');



myMap.loadMarkersFromJson('applet.json');

