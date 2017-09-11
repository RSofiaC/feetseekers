import processing.video.*;
int number = 0;

Capture cam;

void setup() {
  size(960, 540);

  String[] cameras = Capture.list();
  
  if (cameras.length == 0) {
    println("There are no cameras available for capture.");
    exit();
  } else {
    println("Available cameras:");
    for (int i = 0; i < cameras.length; i++) {
      println(cameras[i]);
    }
    // The camera can be initialized directly using an 
    // element from the array returned by list():
    cam = new Capture(this, cameras[4]);
    cam.start();     
  }      
}

void draw() {
  if (cam.available() == true) {
    cam.read();
  }
  image(cam, 0, 0,640*1.5,360*1.5);
}

void keyPressed(){
  if(key == ' '){
    println("Saving "+ nf(number,4));
    String s = "output/" + nf(number,4) +".jpg";
    save(s);
    println( nf(number,4) + " saved.");
    number++;
  }
}