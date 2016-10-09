function daojishi() {
    var max = 3;
    var i = 0;
    var timeline = new TimelineMax().staggerFromTo('.daojishi-number', 1, {
        alpha: 0,
        scale: 1.6,
        ease: Back.easeOut,
        onComplete: function() {
            // $(this.target).hide();
        }
    }, {
        alpha: 1,
        scale: 0.6,
        ease: Back.easeOut,
        onComplete: function() {
            TweenMax.to(this.target, 0.2, {
                opacity: 0
            });
            if (++i == 3) {
                TweenMax.to('.daojishi', 1, {
                    opacity: 0,
                    scale: 0.2,
                    delay: 0.4
                });
            }
        }
    }, 1);
}