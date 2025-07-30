import { Component } from '@angular/core';
import { ImagesService } from '../../../core/services/images.service';

@Component({
  selector: 'app-services-page',
  standalone: false,
  templateUrl: './services-page.html',
  styleUrl: './services-page.css'
})
export class ServicesPage {
  display = false;
  selectedService: any = null;

  /**
   *
   */
  constructor(private imageService: ImagesService) {


  }

  services = [
    {
      title: 'بيع وشراء العقارات',
      subheader: 'استثمر بأمان',
      description:
        'بنساعدك تبيع وتشتري عقاراتك بأفضل سعر وبأسرع وقت بفضل شبكة عملائنا الواسعة وخبرتنا بالسوق.',
      imgUrl: this.imageService.getImageUrl('buy-house.svg', 'illustrations'),
      btnLabel: 'اطلب استشارة',
      btnIcon: 'pi pi-phone',
      btnClass: 'p-button-rounded'
    },
    {
      title: 'إدارة العقارات',
      subheader: 'راحة بالك علينا',
      description:
        'خدمات إدارة كاملة لعقاراتك من تأجير وصيانة وتحقيق أفضل عائد استثماري بدون تعب.',

      imgUrl: this.imageService.getImageUrl('undraw_world_bdnk.svg', 'illustrations'),
      btnLabel: 'تواصل معنا',
      btnIcon: 'pi pi-whatsapp',
      btnClass: 'p-button-success p-button-rounded'
    },
    {
      title: 'البحث عن عقار',
      subheader: 'نلاقيلك يلي بدك ياه',
      description:
        'خبرائنا بيبحثولك عن العقار يلي بيحقق احتياجاتك، سواء شراء أو إيجار، بأفضل العروض.',
      imgUrl: this.imageService.getImageUrl('house-searching.svg', 'illustrations'),
      btnLabel: 'ابدأ البحث',
      btnIcon: 'pi pi-search',
      btnClass: 'p-button-info p-button-rounded'
    },
    {
      title: 'التقييم والاستشارات',
      subheader: 'نعطيك الصورة كاملة',
      description:
        'نقدم لك تقييم احترافي لعقارك مع نصائح مبنية على تحليلات دقيقة للسوق العقاري.',
      imgUrl: this.imageService.getImageUrl('undraw_term-sheet_70lo.svg', 'illustrations'),
      btnLabel: 'استشر خبير',
      btnIcon: 'pi pi-comments',
      btnClass: 'p-button-warning p-button-rounded'
    },
    {
      title: 'التسويق العقاري الرقمي',
      subheader: 'نوصل عقارك للمشتري الصح',
      description:
        'خطط تسويقية رقمية متكاملة (إعلانات ممولة - تصوير احترافي) لعرض عقارك بأفضل صورة.',
      imgUrl: this.imageService.getImageUrl('undraw_email-campaign_2z6t.svg', 'illustrations'),

      btnLabel: 'اعرض عقارك',
      btnIcon: 'pi pi-bullhorn',
      btnClass: 'p-button-danger p-button-rounded'
    },
    {
      title: 'خدمات قانونية عقارية',
      subheader: 'نحمي مصالحك',
      description:
        'دعم قانوني كامل في جميع مراحل البيع أو الشراء والعقود لضمان حقوقك.',
      imgUrl: this.imageService.getImageUrl('undraw_judge_hyqv.svg', 'illustrations'),
      btnLabel: 'استشارة قانونية',
      btnIcon: 'pi pi-verified',
      btnClass: 'p-button-help p-button-rounded'
    }
  ];

  openServiceDetails(service: any) {
    this.selectedService = service;
    this.display = true;
  }
}
