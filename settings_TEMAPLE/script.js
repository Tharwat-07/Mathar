// leave this bullshit for me to move to the main project later, but fix the rest and move them..

const toggle = document.querySelectorAll('.toggle');

for (var i = 0; toggle.length > i; i++) {
  toggle[i].addEventListener('click', function () {
    this.classList.toggle('is-on');
  });
}

$('.toggle').on('click', function(){
    className = $(this).attr('class');
    if (className.slice(-2,)=='on'){
        console.log('off')
    }
    else {
        console.log('on')
    }
});



// Credits
const credits = document.createElement('footer');
credits.innerHTML = '<p><small>Designed and inspired by ZBY</small></p>';
document.body.appendChild(credits);