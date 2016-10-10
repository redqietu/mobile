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
    var timeline = new TimelineMax().fromTo(target, 1, {
        scale: 6,
        rotationZ: 500,
    }, {
        scale: 1,
        rotationZ: 0,
    }).staggerFromTo(target.find('.daojishi-number'), 1, {
        alpha: 0,
        scale: 1.6,
        ease: Power1.easeInOut,
        onComplete: function() {
            // $(this.target).hide();
        }
    }, {
        alpha: 1,
        scale: 0.6,
        ease: Power1.easeInOut,
        onComplete: function() {
            TweenMax.to(this.target, 0.2, {
                opacity: 0,
                display: 'none'
            });
            if (++i == max) {
                onComplete && onComplete();
            }
        }
    }, 1).to(target, 1, {
        opacity: 0,
        delay: 0.4,
        rotationY: '+180',
        rotationX: '+60',
        rotationZ: '+30',
        onComplete: function() {
            $(this.target).hide();
        }
    });
}

function sceneOut(target, container) {
    // TweenMax.set(container, {
    //     perspective: '5rem',
    // });
    // TweenMax.set(target, {
    //     transformOrigin: 'center center -600px',
    //     force3D: true,
    //     ease: Power1.easeInOut
    // });
    // TweenMax.to(target, 1, {
    //     opacity: 0,
    //     delay: 0.4,
    //     rotationY: '+180',
    //     rotationX: '+60',
    //     rotationZ: '+30',
    //     onComplete: function() {
    //         $(this.target).hide();
    //     }
    // });
}

function lajin(target, onComplete) {
    TweenMax.to(target, 2, {
        scale: 1,
        onComplete: onComplete,
        ease: Power1.easeInOut,
    });
}

function begin() {
    var step2 = _.partial(sceneOut, $('.daojishi'), $('.daojishi-container'));
    var step1 = _.partial(daojishi, $('.daojishi'), $('.daojishi-container'), 3, step2);
    lajin($('.p2 .xiaoqu'), step1);
}