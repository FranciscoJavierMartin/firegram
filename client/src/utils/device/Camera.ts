export default class {

  stream: MediaStream|undefined = undefined;

  constructor(public videoNode: any){}

  public turnOn(): void {
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: 300,
        height: 300,
      }
    }).then((stream: MediaStream) => {
      this.videoNode.srcObject = stream;
      this.stream = stream;
    });
    
  }
}