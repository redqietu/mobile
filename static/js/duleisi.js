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
    var timeline = new TimelineMax({
        onComplete: onComplete
    }).
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
    });
}

function comeIn(target, after, onComplete) {
    var timeline = new TimelineMax({
        onComplete: onComplete
    });
    return timeline.fromTo(target, 2, {
        'data-a': 12,
        scale: 6,
        // opacity: 0,
    }, {
        'data-a': 0,
        scale: 1,
        // opacity: 1,
        ease: Sine.easeInOut,
        onUpdate: function() {
            TweenMax.set(target, {
                'webkitFilter': 'blur(' + target.get(0).style['data-a'] + 'px)',
                filter: 'blur(' + target.get(0).style['data-a'] + 'px)',
            });
        }
    }).add(after);
}

function comeIn2(target) {
    return TweenMax.to(target, 1, {
        x: '+100',
        y: '-40',
        // ease: SlowMo.ease.config(0.9, 0.1)
        ease: Power4.easeInOut
    });
}

function begin() {
    var daojishiWithmengban = _.compose(function() {
        TweenMax.to($('.p2 .mengban'), 8, {
            opacity: 0.6,
            backgroundColor: '#000'
        });
    }, _.partial(daojishi, $('.daojishi'), $('.daojishi-container'), 3, function() {
        $('#duleisi').show();
    }));
    comeIn($('.p2 .street'), comeIn2($('.car')), daojishiWithmengban);
}

function init() {
    LInit(60, 'duleisi', $(window).width(), $(window).height(), gameInit);
}

var loadData = [{
    path: './static/images/bk/bk-dian.png',
    name: 'bk-dian'
}, {
    path: './static/images/bk/bk-p1.png',
    name: 'bk-p1'
}, {
    path: './static/images/bk/bk-p2.png',
    name: 'bk-p2'
}, {
    path: './static/images/btn/btn-lijixiaheishou.png',
    name: 'btn-lijixiaheishou'
}, {
    path: './static/images/sprite/1.png',
    name: '1'
}, {
    path: './static/images/sprite/2.png',
    name: '2'
}, {
    path: './static/images/sprite/3.png',
    name: '3'
}, {
    path: './static/images/sprite/car.png',
    name: 'car'
}, {
    path: './static/images/sprite/daojishi.png',
    name: 'daojishi'
}, {
    path: './static/images/sprite/tt1.png',
    name: 'tt1'
}, {
    path: './static/images/sprite/tt2.png',
    name: 'tt2'
}, {
    path: './static/images/sprite/tt3.png',
    name: 'tt3'
}, {
    path: './static/images/sprite/xtt1.png',
    name: 'xtt1'
}, {
    path: './static/images/sprite/xtt2.png',
    name: 'xtt2'
}, {
    path: './static/images/sprite/xtt3.png',
    name: 'xtt3'
}];

function lijixiaheishou() {
    $('#btn-lijixiaheishou').on('tap', function() {
        TweenMax.to('.p1', 1, {
            opacity: 0,
            scale: 0,
            ease: Back.easeInOut,
            x: -1000,
            y: -1000,
            rotation: -100
        });
        var p2 = $('.p2').show();
        TweenMax.fromTo(p2, 1, {
            x: 1000,
            y: 1000,
            opacity: 0,
            rotation: 100,

            ease: Back.easeOut
        }, {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            onComplete: function() {

                // TweenMax.fromTo(p2, 0.6, {
                // }, {
                //     ease: Back.easeOut
                // });
                begin();
            },
            // ease: SlowMo.ease.config(0.1, 0.9)
            ease: Back.easeInOut
        });
    });
}

function gameInit() {
    var backlayer = new LSprite();
    loadingLayer = new LoadingSample4();
    addChild(backlayer);
    backlayer.addChild(loadingLayer);
    LLoadManage.load(loadData, function(x) {
        loadingLayer.setProgress(x);
    }, function(r) {
        setTimeout(function() {
            backlayer.removeChild(loadingLayer);
            loadingLayer = null;
            $('#duleisi').hide();
            $('body').removeClass('loading');
            lijixiaheishou();
            $('.page').css('backgroundColor', '#f7f7f7');
        }, 100);
    });
}