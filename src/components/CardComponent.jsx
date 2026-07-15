import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ChevronRight } from 'lucide-react'

const CardComponent = ({title, desc, cta}) => {
    return (
        <Card className={"rounded-none border-0 shadow-none ring-0 text-left bg-card"}>
            <CardHeader>
                <CardTitle className={"text-ink/80 font-medium text-[14px]"}>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className='text-[12px] text-ink-muted mb-6'> {desc} </p>
                <a href="#contact" className="cursor-pointer text-accent text-[12px] tracking-wider uppercase flex items-center gap-1.25 transition-all duration-500 ease-in-out hover:gap-2 hover:text-accent/95"> 
                <span >{cta}</span><ChevronRight size={13} strokeWidth={4} />
                </a>
            </CardContent>
        </Card>
    )
}

export default CardComponent