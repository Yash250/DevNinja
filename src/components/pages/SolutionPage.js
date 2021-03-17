import React from 'react'
import Section from '../section/Section'
import { homeObjFour, homeObjSix } from './HomePage/Data'

const SolutionPage = () => {
    return (
        <>
        <Section {...homeObjFour} />
        <Section {...homeObjSix} />
        </>
    )
}

export default SolutionPage
