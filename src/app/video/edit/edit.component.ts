import { Component, OnInit, OnDestroy, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import IClip from 'src/app/models/clip.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClipService } from 'src/app/services/clip.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {


  showAlert = false
  alertColor = 'blue'
  alertMsg = 'Please wait! Updating Clip'
  inSubmission = false


  @Input() activeClip: IClip | null = null
  @Output() update  = new EventEmitter()

  clipID = new FormControl('', {
    nonNullable: true
  })
  title = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3)
    ],
    nonNullable: true
  })

  editForm = new FormGroup({
    title: this.title,
    id: this.clipID

  })


  constructor(private modalService: ModalService, private clipService: ClipService) {

  }
  ngOnChanges(): void {
    
    if (!this.activeClip) { 
      return
    }

    this.inSubmission = false
    this.showAlert =false    
    this.clipID.setValue(this.activeClip.docID as string);
    this.title.setValue(this.activeClip.title)

  }
  ngOnDestroy(): void {
    this.modalService.unregister('editClip')
  }
  ngOnInit(): void {
    this.modalService.register('editClip')
  }

  async submit() {

    if(!this.activeClip)
    {
      return
    }

    this.inSubmission = true
    this.showAlert = true
    this.alertColor = 'blue'
    this.alertMsg = 'Please wait! Updating Clip'
    
    try {
      await this.clipService.updateClip(this.clipID.value, this.title.value)
    }
    catch (err) {
      this.inSubmission = false  
      this.alertColor = 'red'
      this.alertMsg = `Ohh!!! Something went wrong. Error Details[] ${err}`
      return
    }

    this.activeClip.title = this.title.value 
    this.update.emit(this.activeClip)
    this.inSubmission = false
    this.alertColor = 'green'
    this.alertMsg = `Success`



  }
}
