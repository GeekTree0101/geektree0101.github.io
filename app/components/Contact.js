import Vue from 'vue';

var ContactView = Vue.component('contact-view', {
    template: `
    <footer id="contact" class="footer">
        <div class="container">
            <div class="col-md-4">
                <h4>Contact</h4>
                <p> 513, Seolleung-ro, Gangnam-gu, Seoul, Republic of Korea.
                    <br> Call: +082-010-5000-0308 <br>
                    Email : <a href="hyeonsu.ha@vingle.net">hyeonsu.ha@vingle.net</a>
                </p>
            </div>
            <div class="col-md-3">
                <h4>Social presense</h4>
                <ul class="footer-share">
                    <li><a href="https://github.com/GeekTree0101"><i class="fa fa-github"></i></a></li>
                    <li><a href="https://www.linkedin.com/in/hyeonsu-ha-7ba02b112/"><i class="fa fa-linkedin"></i></a></li>
                    <li><a href="https://www.facebook.com/profile.php?id=100009249402427"><i class="fa fa-facebook"></i></a></li>
                </ul>
            </div>
        </div>
    </footer>`
});