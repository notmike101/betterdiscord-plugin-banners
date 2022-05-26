export interface BannerInterface {}

export interface BannerOptions {
  acceptCallback?: any;
  dismissCallback?: any;
  acceptButtonString?: string;
  dismissButtonString?: string;
  backgroundColor?: string;
  acceptButtonBorderColor?: string;
  dismissButtonBorderColor?: string;
  acceptButtonBackgroundColor?: string;
  dismissButtonBackgroundColor?: string;
  acceptButtonFontColor?: string;
  dismissButtonFontColor?: string;
  fontColor?: string;
}

export class Banners implements BannerInterface {
  public bannerContainer: HTMLDivElement;
  public banners: HTMLDivElement[];

  constructor() {
    this.banners = [];

    const existingBannerContainer: HTMLDivElement = document.querySelector('#plugin-banner-container');

    if (!existingBannerContainer) {
      const bannerContainer = document.createElement('div');
      
      this.bannerContainer = bannerContainer;
      this.bannerContainer.style.cssText = `
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 1;
          align-items: center;
          justify-content: center;
        `;
      this.bannerContainer.id = 'plugin-banner-container';

      document.querySelector('#app-mount > div[class^="app"] > div[class^="app"]').prepend(this.bannerContainer);
    } else {
      this.bannerContainer = existingBannerContainer;
    }
  }

  public createBanner(content: string, options: BannerOptions): number {
    const banner: HTMLDivElement = document.createElement('div');
    const bannerText: HTMLSpanElement = document.createElement('span');
    const bannerApprove: HTMLButtonElement = document.createElement('button');
    const bannerDismiss: HTMLButtonElement = document.createElement('button');
    const bannerIndex: number = this.banners.length;

    banner.style.cssText = `
      display: flex;
      flex: 1;
      background-color: ${options.backgroundColor ?? 'var(--info-help-background)'};
      color: ${options.fontColor ?? 'var(--info-help-text)'};
      padding: 6px 0;
      font-size: 12px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 100%;
      margin: 0 15px;
    `;

    bannerApprove.style.cssText = `
      color: ${options.acceptButtonFontColor ?? '#ffffff'};
      background-color: ${options.acceptButtonBackgroundColor ?? 'var(--button-positive-background)'};
      border: 1px solid ${options.acceptButtonBorderColor ?? 'var(--button-positive-border)'};
      outline: none;
      margin: 0 15px;
    `;

    bannerDismiss.style.cssText = `
      color: ${options.dismissButtonFontColor ?? '#ffffff'};
      background-color: ${options.dismissButtonBackgroundColor ?? 'var(--button-danger-background)'};
      border: 1px solid ${options.dismissButtonBorderColor ?? 'var(--button-danger-border)'};
      outline: none;
    `;

    bannerApprove.textContent = options.acceptButtonString ?? 'Accept';
    bannerDismiss.textContent = options.dismissButtonString ?? 'Dismiss';
    bannerText.textContent = content;

    bannerApprove.addEventListener('pointerup', () => {
      this.dismissBanner(bannerIndex);

      if (options.acceptCallback) {
        options.acceptCallback();
      }
    });

    bannerDismiss.addEventListener('pointerup', () => {
      this.dismissBanner(bannerIndex);

      if (options.dismissCallback) {
        options.dismissCallback();
      }
    });

    banner.append(bannerText, bannerApprove, bannerDismiss);

    this.bannerContainer.append(banner);

    this.banners.push(banner);

    return bannerIndex;
  }

  private dismissBanner(bannerIndex): void {
    this.banners[bannerIndex].remove();
  }
}
