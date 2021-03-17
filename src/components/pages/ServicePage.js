import React from 'react'
import Section from '../section/Section'
import { homeObjTwo,homeObjFive,homeObjThree } from './HomePage/Data'

const ServicePage = () => {
    return (
       <>
       <Section {...homeObjTwo} />
        <Section {...homeObjFive} />
        <Section {...homeObjThree} />
       </>
    )
}

export default ServicePage
