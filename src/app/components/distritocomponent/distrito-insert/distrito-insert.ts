import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Distrito } from '../../../models/distrito';
import { DistritoServices } from '../../../services/distrito-services';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-distrito-insert',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    GoogleMapsModule,
  ],
  templateUrl: './distrito-insert.html',
  styleUrl: './distrito-insert.css',
})
export class DistritoInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  dist: Distrito = new Distrito();

  center: google.maps.LatLngLiteral = { lat: -12.0464, lng: -77.0428 };
  zoom = 12;
  markerPosition: google.maps.LatLngLiteral | null = null;
  buscandoLugar = false;
  private geocoder = new google.maps.Geocoder();
  constructor(
    private dS: DistritoServices,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombreDistrito: ['', [Validators.required, Validators.maxLength(50)]],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
    });
  }

  onMapClick(event: google.maps.MapMouseEvent): void {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();
    if (lat == null || lng == null) {
      return;
    }

    this.markerPosition = { lat, lng };
    this.buscandoLugar = true;

    this.form.patchValue({
      latitud: lat.toFixed(6),
      longitud: lng.toFixed(6),
    });

    this.geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      this.buscandoLugar = false;

      if (status === 'OK' && results && results.length > 0) {
        const nombre = this.extraerNombreDistrito(results);
        if (nombre) {
          this.form.patchValue({ nombreDistrito: nombre });
        }
      }
    });
  }

  private extraerNombreDistrito(results: google.maps.GeocoderResult[]): string | null {
    for (const result of results) {
      const componente = result.address_components.find(
        (c) => c.types.includes('locality') || c.types.includes('sublocality')
      );
      if (componente) {
        return componente.long_name;
      }
    }
    return null;
  }

  aceptar(): void {
    if (this.form.valid) {
      this.dist.nombreDistrito = this.form.value.nombreDistrito;
      this.dist.latitud = this.form.value.latitud;
      this.dist.longitud = this.form.value.longitud;

      this.dS.insert(this.dist).subscribe({
        next: () => {
          this.router.navigate(['/distritos/lista']);
        },
      });
    }
  }
}
