import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { IncidenciasServices } from '../../services/incidencias-services';

@Component({
  selector: 'app-reporte-distritos',
  imports: [MatIconModule, BaseChartDirective],
  templateUrl: './reporte-distritos.html',
  styleUrl: './reporte-distritos.css',
})
export class ReporteDistritos implements OnInit {
  hasData = false;
  loading = true;

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLegend = true;
  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar';

  constructor(private iS: IncidenciasServices, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.iS.conteoPorDistrito().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.hasData = true;
          this.barChartLabels = data.map((item) => item.nombreDistrito);
          this.barChartData = [
            {
              data: data.map((item) => item.total),
              label: 'Cantidad de incidencias',
              backgroundColor: [
                '#4A6FA8',
                '#FF6F61',
                '#4A6FA8',
                '#FF6F61',
                '#4A6FA8',
                '#FF6F61',
              ],
            },
          ];
        } else {
          this.hasData = false;
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando el reporte de distritos:', err);
        this.hasData = false;
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}  
