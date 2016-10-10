function daojishi(target, container, begin, onComplete) {
    var max = begin;
    var i = 0;
    target.show();
    TweenMax.set(container, {
        perspective: '5rem',
    });
    TweenMax.set(target, {
        transformOrigin: 'center center -600px',
        force3D: true,
        ease: Power1.easeInOut
    });
    var timeline = new TimelineMax().
    fromTo(target, 0.4, {
        scale: 0.2,
        opacity: 0,
        rotationX: '+100',
        rotationY: '-60',
        rotationZ: '-300',
    }, {
        scale: 1,
        opacity: 1,
        yoyo: true,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
    }).
    staggerFromTo(target.find('.daojishi-number'), 1, {
        alpha: 0,
        scale: 1.6,
        ease: Power1.easeInOut
    }, {
        alpha: 1,
        scale: 0.6,
        ease: Power1.easeInOut,
        onComplete: function() {
            TweenMax.to(this.target, 0.2, {
                opacity: 0,
                display: 'none'
            });
        }
    }, 1).
    to(target, 1, {
        opacity: 0,
        delay: 0.4,
        rotationY: '+180',
        rotationX: '+60',
        rotationZ: '+30',
        onComplete: function() {
            $(this.target).hide();
        }
    }).add(onComplete);
}

function comeIn(target, onComplete) {
    return TweenMax.fromTo(target, 1, {
        scale: 9,
    }, {
        scale: 1,
        onComplete: onComplete,
        ease: Power1.easeIn,
    });
}

function comeIn2(target) {
    return TweenMax.to(target, 1, {
        x: '+100',
        y: '-40',
        ease: Power1.easeOut
    });
}

function begin() {
    var carComeIn = _.partial(comeIn2, $('.car'));
    comeIn($('.p2 .xiaoqu'), _.partial(daojishi, $('.daojishi'), $('.daojishi-container'), 3, carComeIn));
}