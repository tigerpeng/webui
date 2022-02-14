
//交换一下首页
//import HomePage from  '../pages/social.vue';
//import SocialPage from '../pages/home.vue'; 
//import AboutPage from '../pages/about.vue';
//import FormPage from '../pages/form.vue';
//import CatalogPage from '../pages/catalog.vue';
//import ProductPage from '../pages/product.vue';
//import SettingsPage from '../pages/settings.vue';
//import TeaHousePage  from '../pages/teaHouse.vue';
//import TableListPage  from '../pages/tableList.vue';
//import MessagePage  from '../pages/message.vue';
//import ProfilePage  from '../pages/profile.vue';
//import CoinsPage  from '../pages/coins.vue';
//import BeansPage  from '../pages/beans.vue';
//import ScoresPage  from '../pages/scores.vue';
//import DebugPage from '../pages/debug.vue';
//import LogoutPage from '../pages/logout.vue';
//import AvatarEditPage from '../pages/avatarEdit.vue';
//import AskPage from '../pages/ask.vue';
//import InfoPage from '../pages/info.vue';
//import VideoSelectPage from '../pages/video_select.vue';
//import TestDataTable from '../pages/debug_ok/data_table.vue'
//import DynamicRoutePage from '../pages/dynamic-route.vue';

import WorldPage        from '../pages/worldList';
import SocialPage       from '../pages/social';
import MyselfPage       from '../pages/my.vue';
import PhoneLoginPage   from '../pages/login.vue';


import TeaHousePage     from '../pages/teaHouse';
import TabelListPage    from '../pages/tableList';


import RequestAndLoad     from '../pages/request-and-load.vue';
import NotFoundPage       from '../pages/404.vue';

//import HomePage         from '../pages/home';
//import AppsPage         from '../pages/appList';



var routes = [
  {
    path: '/',
    //component: HomePage,
    //asyncComponent: () => import('@/pages/social'),         //framework7 vue 语法
     async: function (routeTo, routeFrom, resolve, reject) {
      if(localStorage.login){
        resolve({component: WorldPage,})
      }else{
        resolve({component: PhoneLoginPage,})
      }
    }
    
  },  
  {
    path: '/social/',    
    async: function (routeTo, routeFrom, resolve, reject) {
      if(localStorage.login){
        resolve({component: SocialPage,})
      }else{
        resolve({component: PhoneLoginPage,})
      }
    }
  },
  /*
  {//这个不用了 该用上面的apps
    path: '/settings/',
    //asyncComponent: () => import('@/pages/teaHouse'),
    
    async: function (routeTo, routeFrom, resolve, reject) {
      if(localStorage.login){
        resolve({component: TeaHousePage,})
      }else{
        resolve({component: PhoneLoginPage,})
      }
    }

  },*/

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
  {//茶馆列表
    path: '/tea_house_list/',
    asyncComponent: () => import('@/pages/teaHouseList'),
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
    path: '/money_talks/',
    asyncComponent: () => import('@/pages/money_talks'),
  },
  {
    path: '/video_select/',
    asyncComponent: () => import('@/pages/video_select'),
  },
  {
    path: '/about/',
    asyncComponent: () => import('@/pages/about'),
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
    asyncComponent: () => import('@/pages/product'),
  },
  {
    path:'/teahouse-create/',
    asyncComponent: () => import('@/pages/teahouseCreate'),
  },
  // {
  //   path:'/family-add/',
  //   asyncComponent: () => import('@/pages/familyAdd'),
  // },
  {
    path:'/family-poster/familyId/:fId/',
    asyncComponent: () => import('@/pages/familyPoster'),
  },


  {
    path: '/dynamic-tables/boss/:rId/name/:rName',
    asyncComponent: () => import('@/pages/tableList'),
  },
  {
    path: '/message/',
    asyncComponent: () => import('@/pages/message'),
  },
  {
    path: '/profile/',
    asyncComponent: () => import('@/pages/profile'),
  },

  {
    path: '/myself2/',
    component: MyselfPage,
  },
  {
    path: '/login/',
    component: PhoneLoginPage,
  },
  {
    path: '/logout/',
    asyncComponent: () => import('@/pages/logout'),
  },
  {
    path: '/ask/type/:tID/from/:profile/',
    asyncComponent: () => import('@/pages/ask'),
  },
  {
    path: '/info/json/:jcmd/',
    asyncComponent: () => import('@/pages/info'),
  },
  {
    path: '/avatarEdit/',
    asyncComponent: () => import('@/pages/avatarEdit'),
  },
  {
    path: '/debug/',
    asyncComponent: () => import('@/pages/debug'),
  },
  // {
  //   path: '/test_data_table/',
  //   component: TestDataTable,
  // },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    asyncComponent: () => import('@/pages/dynamic-route'),
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
