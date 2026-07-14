import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {
    NextButton,
    PrevButton,
    usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import '../css/embla.css'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { NameInnitial } from '@/lib/utils'
import { Star } from 'lucide-react'

const EmblaCarousel = (props) => {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    return (
        <div className="embla min-w-full">
            <div className="embla__viewport w-full pl-4" ref={emblaRef}>
                <div className="embla__container gap-6 w-full">
                    {slides.map((slide, index) => (
                        <div className="embla__slide bg-[#2c2d39] text-left flex relative py-8 px-4" key={index}>
                            <div className="w-full flex flex-col justify-between">
                                <div className='flex justify-between items-center mb-1'>
                                    <div>
                                        <h4 className='text-[14px] tracking-tighter text-white/80'>{slide.fullName}</h4>
                                        <small className='mt-px mb-3 block text-[12px] text-[#777779] font-light '>{slide.position} </small>
                                    </div>
                                    {/* avatar */}
                                    <Avatar size="lg" className={''}>
                                        <AvatarImage
                                            src={slide.avatar}
                                        />
                                        <AvatarFallback className={"bg-[#20202a] text-[#eec037] text-2xl font-semibold border-0 shadow-none ring-0"}>{NameInnitial(slide.fullName)}</AvatarFallback>
                                    </Avatar>
                                </div>
                                <p className='text-[13px] text-[#777779] leading-4.5'>{slide.testimonial} </p>

                                {/* rating star display */}
                                <div className="flex items-center gap-1 mt-5 bg-[#20202a] w-max p-1 rounded">
                                    {[...Array(5)].map((_, index) => (
                                        <Star
                                            key={index}
                                            size={12}
                                            className={
                                                index < slide.rating
                                                    ? "fill-[#eec037] text-[#eec037]"
                                                    : "fill-[#2b2b35] text-[#2b2b35]"
                                            }
                                        />
                                    ))}
                                </div>
                            </div>



                        </div>
                    ))}
                </div>
            </div>

            <div className="embla__controls w-full">
                <div className="embla__buttons">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>

                <div className="embla__dots flex gap-2">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={'embla__dot'.concat(
                                index === selectedIndex ? ' embla__dot--selected' : ''
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EmblaCarousel
