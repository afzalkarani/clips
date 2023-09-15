import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation  
} from '@angular/core';
//import videojs from 'video.js';
import { ActivatedRoute, Params } from '@angular/router';
//import Player from 'video.js/dist/types/player';
import videojs from 'video.js/dist/video.min';
import IClip from '../models/clip.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[DatePipe]
})
export class ClipComponent implements OnInit, AfterViewInit { 
  @ViewChild('videoPlayer', {static: true}) target: ElementRef;
  player?: videojs.Player
  clip?: IClip

   @Input() options: {
      fluid: boolean,
      aspectRatio: string,
      autoplay: boolean,
      sources: {
          src: string,
          type: string,
      }[],
  };




  constructor(public route: ActivatedRoute) {

  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.player= videojs(this.target.nativeElement)

   this.route.data.subscribe(data=>{
    this.clip = data.clip as IClip

    this.player?.src({
      src:this.clip.url,
      type:'video/mp4'
    })
   })
  }
}
