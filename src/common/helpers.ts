import gsap from 'gsap'

const fadeIn = (element: any) => {
    gsap.to(element, 1, {
        opacity: 1,
        pointerEvents: 'fill',
        ease: "power4.out",
        stagger: 0.3,
    })
}

const fadeOut = (element: any) => {
    gsap.to(element, 1, {
        opacity: 0,
        pointerEvents: 'none',
        ease: "power4.out",
        stagger: 0.3,
    })
}
const fadeInUnselect = (element: any) => {
    gsap.to(element, 1, {
        opacity: 1,
        ease: "power4.out",
        stagger: 0.3,
    })
}

const fadeOutUnselect = (element: any) => {
    gsap.to(element, 1, {
        opacity: 0,
        ease: "power4.out",
        stagger: 0.3,
    })
}

const fromDown = (element: any) => {
    gsap.to(element, 1, {
        scale: .5,
        ease: "power4.out",
        stagger: 0.3,
    })
}
const fromUp = (element: any) => {
    gsap.to(element, 1, {
        scale: 1.5,
        ease: "power4.out",
        stagger: 0.3,
    })
}

const moveCenter = (element: any) => {
    gsap.to(element, 1, {
        scale: 1,
        ease: "power4.out",
        stagger: 0.3,
    })
}

const arrowClose = (parent: any, element: any, direction: string) => {
    gsap.to(element, .5, {
        width: 0,
        ease: "power4.out",
        stagger: 0.3,
        onUpdate: function () {
            if (this.progress() >= .2) {
                gsap.to(parent, .5, {
                    pointerEvents: 'none'
                })
                if (direction === 'r')
                    gsap.to(element, .5, {
                        '--rotateUpRight': '-90deg',
                        '--rotateDownRight': '90deg',
                        ease: "power4.out",
                    });
                else
                    gsap.to(element, .5, {
                        '--rotateUpLeft': '-45deg',
                        '--rotateDownLeft': '45deg',
                        ease: "power4.out",
                    });
            }
        },
    })
}
const arrowOpen = (parent: any, element: any, direction: string) => {
    gsap.to(element, .5, {
        width: 50,
        ease: "power4.out",
        stagger: 0.3,

        onUpdate: function () {
            if (this.progress() >= .2) {

                gsap.to(parent, .5, {
                    pointerEvents: 'fill'
                })
                if (direction === 'r')
                    gsap.to(element, .5, {
                        '--rotateUpRight': '-45deg',
                        '--rotateDownRight': '45deg',
                        ease: "power4.out",
                    });
                else
                    gsap.to(element, .5, {
                        '--rotateUpLeft': '-0deg',
                        '--rotateDownLeft': '0deg',
                        ease: "power4.out",
                    });
            }
        },
    })
}
const arrowCloseDown = (element: any) => {
    const tl = gsap.timeline()

    tl.to(element, 1, {
        width: 0,
        right: 0,
        ease: "power4.out",
        stagger: 0.3,
    }).to(element, 1, {
        '--rotate': '90deg'
    })

}

export {
    fadeIn, fadeOut, fromDown, fromUp, moveCenter, fadeInUnselect, fadeOutUnselect,
    arrowClose, arrowCloseDown, arrowOpen,
}