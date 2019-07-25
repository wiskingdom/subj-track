import Vue from 'vue';

import './styles/quasar.styl';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import {
  Quasar,
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QInput,
  QBadge,
  QSelect,
  Dialog,
  Ripple,
  QBanner,
  QAvatar,
  QToggle,
  QTooltip,
  QDialog,
  Loading,
} from 'quasar';

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QInput,
    QBadge,
    QSelect,
    QBanner,
    QAvatar,
    QToggle,
    QTooltip,
    QDialog,
  },
  directives: {
    Ripple,
  },
  plugins: {
    Dialog,
    Loading,
  },
});
