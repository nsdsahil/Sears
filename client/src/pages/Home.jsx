import React from 'react'
import Carousel from '../components/Carousel'
import {brands, carouselImages, promise} from '../assets/image'
import  {categories}  from '../assets/image'
import  {Categories}  from '../sections/Categories'
import { GridBanner } from '../components/GridBanner'
import { FlexBanner } from '../components/FlexBanner'
import { Guide } from '../sections/guide'
import guide from '../docs/guide'
import ProductSlider from '../sections/ProductSlider'
import products from "../docs/products"
import { Footer } from '../sections/footer'
import { GridBanner2 } from '../components/GridBanner2'


/**
* @author sahil nishad
* @function Home
**/

const Home = () => {
    
  return(
    <>
    <Carousel images={carouselImages} />
    <Categories categories={categories} heading={"SHOP BY CATEGORY"}/>
    <GridBanner heading={"WORK IN SOME SAVINGS"}/>
    <Categories categories={brands} heading={"SHOP OUR TOP BRANDS "}/>
    <FlexBanner/>
    <GridBanner2 heading={"OUR APPlIANCES PROMISE"}/>
    <Categories categories={promise} heading={"OUR APPlIANCES PROMISE"}/>
    <FlexBanner/>
    <Guide heading={"Sears Guide"} docs={guide}/>
    <ProductSlider products={products}/>
    
    </>
   )
  }
export default Home