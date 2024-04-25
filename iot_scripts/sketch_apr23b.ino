#include <ArduinoJson.h>

void setup() {
  Serial.begin(9660);
  pinMode(7,OUTPUT);
  pinMode(9, OUTPUT);

}

void loop() {
  int value = analogRead(A0);
  StaticJsonDocument<200> doc;
  doc["value"] = value;
  serializeJson(doc, Serial);
  
  delay(200);
  if (value > 500) {
    digitalWrite(7,HIGH);
    delay(3000);
    digitalWrite(7,LOW);
  } else {
    digitalWrite(9, HIGH);
    delay(3000);
    digitalWrite(9, LOW);
  }

}
