import {Component} from '@angular/core';
import {Home} from '../components/home/home';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home.page',
  imports: [
    Home,
    RouterLink
  ],
  template: `
    <app-home></app-home>
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h4>À propos</h4>
            <ul>
              <li><a routerLink="/about" >Qui sommes-nous</a></li>
              <li><a href="#">Notre histoire</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Contactez-nous</a></li>
              <li><a routerLink="/setting">Configuration</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Légal</h4>
            <ul>
              <li><a href="#">Montion légal</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Suivez-nous</h4>
            <div class="social-links">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Twitter">𝕏</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="LinkedIn">in</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 Utilix. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  `,
  styles: `
    /* ========================================
       PIED DE PAGE
       ======================================== */

  .footer {
    background-color: var(--color-text);
    color: white;
    padding: var(--spacing-2xl) 0 var(--spacing-lg);
    margin-top: var(--spacing-2xl);
  }

  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
  }

  .footer-section h4 {
    color: white;
    margin-bottom: var(--spacing-md);
  }

  .footer-section ul {
    list-style: none;
  }

  .footer-section ul li {
    margin-bottom: var(--spacing-sm);
  }

  .footer-section a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .footer-section a:hover {
    color: white;
  }

  .social-links {
    display: flex;
    gap: var(--spacing-md);
  }

  .social-links a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-md);
    font-weight: 700;
    transition: all var(--transition-fast);
  }

  .social-links a:hover {
    background-color: var(--color-primary);
  }

  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: var(--spacing-lg);
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9375rem;
  }

`
})
export class HomePage {

}
