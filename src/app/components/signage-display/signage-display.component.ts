import { Component, OnInit, OnDestroy, ViewChild, ElementRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { UserConfigService } from '../../services/user-config.service';
import { ProductsByCategory } from '../../models/product.model';
import { UserConfig } from '../../models/user-config.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-signage-display',
  imports: [CommonModule],
  templateUrl: './signage-display.component.html',
  styleUrl: './signage-display.component.scss'
})
export class SignageDisplayComponent implements OnInit, OnDestroy {
  @ViewChild('scrollContainer', { static: false }) scrollContainer?: ElementRef;

  protected readonly productsByCategory = signal<ProductsByCategory[]>([]);
  protected readonly userConfig = signal<UserConfig | null>(null);
  protected readonly isLoading = signal(true);

  private destroy$ = new Subject<void>();
  private scrollInterval?: number;
  private isScrolling = false;

  constructor(
    private productService: ProductService,
    private userConfigService: UserConfigService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.stopAutoScroll();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadData(): void {
    // Load user configuration
    this.userConfigService.getConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (config) => {
          this.userConfig.set(config);
          this.userConfigService.applyTheme();
        },
        error: (error) => console.error('Error loading config:', error)
      });

    // Load products
    this.productService.getProductsByCategory()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.productsByCategory.set(data);
          this.isLoading.set(false);
          // Start auto-scroll after content loads
          setTimeout(() => this.startAutoScroll(), 1000);
        },
        error: (error) => {
          console.error('Error loading products:', error);
          this.isLoading.set(false);
        }
      });
  }

  private startAutoScroll(): void {
    if (this.isScrolling || !this.scrollContainer) {
      return;
    }

    this.isScrolling = true;
    const container = this.scrollContainer.nativeElement;
    const config = this.userConfig();
    const scrollSpeed = config?.scrollSpeed || 50;

    this.scrollInterval = window.setInterval(() => {
      if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
        // Reached the bottom, pause and restart from top
        this.stopAutoScroll();
        setTimeout(() => {
          container.scrollTop = 0;
          this.startAutoScroll();
        }, config?.scrollDelay || 2000);
      } else {
        // Continue scrolling
        container.scrollTop += 1;
      }
    }, 1000 / scrollSpeed); // Convert pixels per second to interval
  }

  private stopAutoScroll(): void {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
      this.scrollInterval = undefined;
      this.isScrolling = false;
    }
  }

  trackByCategory(index: number, item: ProductsByCategory): string {
    return item.category.id;
  }

  trackByProduct(index: number, item: any): string {
    return item.id;
  }
}
