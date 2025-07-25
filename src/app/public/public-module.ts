import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing-module';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { Home } from './components/home/home';
import { PublicLayout } from './layout/public-layout/public-layout';
import { Hero } from './components/home/hero/hero';
import { ServicesSection } from './components/home/services-section/services-section';
import { FeaturedProperties } from './components/home/featured-properties/featured-properties';
import { PropertyCard } from './components/home/featured-properties/property-card/property-card';
import { Star } from '../shared/star/star';
import { Testimonials } from './components/home/testimonials/testimonials';
import { TestimonialCard } from './components/home/testimonials/testimonial-card/testimonial-card';
import { Properties } from './components/properties/properties';
import { Card } from './components/properties/card/card';
import { CategoriesFilter } from './components/properties/categories-filter/categories-filter';
import { PropertyDetails } from './components/properties/property-details/property-details';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { GalleriaModule } from 'primeng/galleria';
import { Image } from 'primeng/image';
import { NotFound404 } from './components/not-found-404/not-found-404';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConvertSpaceToDashPipe } from "../core/pipes/convert-space-to-dash-pipe";
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CommentsSection } from './components/properties/property-details/comments-section/comments-section';
import { CommentBox } from './components/properties/property-details/comments-section/comment-box/comment-box';
import { AddComment } from './components/properties/property-details/comments-section/add-comment/add-comment';
import { FavoriteCard } from './components/favorite/favorite-card/favorite-card';
import { Favorite } from './components/favorite/favorite';

@NgModule({
  declarations: [
    Navbar,
    Footer,
    Home,
    PublicLayout,
    Hero,
    ServicesSection,
    FeaturedProperties,
    PropertyCard,
    Star,
    Testimonials,
    TestimonialCard,
    Properties,
    Card,
    CategoriesFilter,
    PropertyDetails,
    NotFound404,
    CommentsSection,
    CommentBox,
    AddComment,
    Favorite,
    FavoriteCard,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ButtonModule,
    Dialog,
    GalleriaModule,
    Image,
    ConvertSpaceToDashPipe,
    FloatLabelModule, InputTextModule, FormsModule,

  ]
})
export class PublicModule { }
