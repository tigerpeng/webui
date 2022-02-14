
//交换一下首页
//import HomePage from  '../pages/social.vue';
//import SocialPage from '../pages/home.vue'; 


//import AboutPage from '../pages/about.vue';
//import FormPage from '../pages/form.vue';
//import CatalogPage from '../pages/catalog.vue';
//import ProductPage from '../pages/product.vue';
//import SettingsPage from '../pages/settings.vue';


import MyselfPage  from '../pages/my.vue';
import PhoneLoginPage  from '../pages/login.vue';

//import TeaHousePage  from '../pages/teaHouse.vue';
//import TableListPage  from '../pages/tableList.vue';
//import FamilyCreatePage from '../pages/familyCreate.vue';
//import FamilyAddPage from '../pages/familyAdd.vue';
//import FamilyPosterPage from '../pages/familyPoster.vue';




//import MessagePage  from '../pages/message.vue';
//import ProfilePage  from '../pages/profile.vue';


//import CoinsPage  from '../pages/coins.vue';
//import BeansPage  from '../pages/beans.vue';
//import ScoresPage  from '../pages/scores.vue';


//import DebugPage from '../pages/debug.vue';
//import LogoutPage from '../pages/logout.vue';
import AvatarEditPage from '../pages/avatarEdit.vue';

//import AskPage from '../pages/ask.vue';
//import InfoPage from '../pages/info.vue';

import DynamicRoutePage from '../pages/dynamic-route.vue';
import RequestAndLoad from '../pages/request-and-load.vue';
import NotFoundPage from '../pages/404.vue';




//import TestDataTable from '../pages/debug_ok/data_table.vue'
//import VideoSelectPage from '../pages/video_select.vue';




var routes = [
  {
    path: '/',
    //component: HomePage,
    //懒加载 延迟加载
    //component: () => import('@/pages/video_select'),      //webpacket 语法
    asyncComponent: () => import('@/pages/social'),         //framework7 vue 语法
  },
  {
    path: '/social/',
    asyncComponent: () => import('@/pages/home'),
  },
  {
    path: '/about/',
    asyncComponent: () => import('@/pages/about'),
  },
  {
    path: '/coins/',
    asyncComponent: () => import('@/pages/coins'),
  },
  {
    path: '/beans/',
    asyncComponent: () => import('@/pages/beans'),
  },
  {
    path: '/scores/',
    asyncComponent: () => import('@/pages/scores'),
  },
  {
    path: '/form/',
    asyncComponent: () => import('@/pages/form'),
  },
  {
    path: '/catalog/',
    asyncComponent: () => import('@/pages/catalog'),
  },
  {
    path: '/product/:id/',
    //component: ProductPage,
    asyncComponent: () => import('@/pages/product'),

  },
  {
    path: '/settings/',
    asyncComponent: () => import('@/pages/teaHouse'),
  },
  {
    path:'/family-create/',
    //component:FamilyCreatePage,
    asyncComponent: () => import('@/pages/familyCreate'),
  },
  {
    path:'/family-add/',
    //component:FamilyAddPage,
    asyncComponent: () => import('@/pages/familyAdd'),
  },
  {
    path:'/family-poster/familyId/:fId/',
    //component:FamilyPosterPage,
    asyncComponent: () => import('@/pages/familyPoster'),
  },
  {
    path: '/dynamic-tables/boss/:rId/name/:rName',
    //component: TableListPage,
    asyncComponent: () => import('@/pages/tableList'),
  },
  {
    path: '/message/',
    //component: MessagePage,
    asyncComponent: () => import('@/pages/message'),
  },
  {
    path: '/profile/',
    //component: ProfilePage,
    asyncComponent: () => import('@/pages/profile'),
  },
  {
    path: '/myself/',
    async: function (routeTo, routeFrom, resolve, reject) {
      if(localStorage.login){
        resolve({component: MyselfPage,})
      }else{
        resolve({component: PhoneLoginPage,})
      }
    }
  },
  {
    path: '/myself2/',
    asyncComponent: () => import('@/pages/my'),
  },
  {
    path: '/login/',
    asyncComponent: () => import('@/pages/login'),
  },

  {
    path: '/logout/',
    component: LogoutPage,
    asyncComponent: () => import('@/pages/logout'),
  },
  {
    path: '/ask/type/:tID/from/:profile/',
    //component: AskPage,
    asyncComponent: () => import('@/pages/ask'),
  },
  {
    path: '/info/json/:jcmd/',
    component: InfoPage,
    asyncComponent: () => import('@/pages/profile'),
  },
  {
    path: '/avatarEdit/',
    component: AvatarEditPage,
    asyncComponent: () => import('@/pages/profile'),
  },
  {
    path: '/debug/',
    component: DebugPage,
    asyncComponent: () => import('@/pages/profile'),
  },
  // {
  //   path: '/test_data_table/',
  //   component: TestDataTable,
  // },
  {
    path: '/video_select/',
    asyncComponent: () => import('@/pages/video_select'),   //framework7 vue
    //component: VideoSelectPage,
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
    asyncComponent: () => import('@/pages/profile'),
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
