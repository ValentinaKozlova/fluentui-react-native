import {
  MENUBUTTONV1_TESTPAGE,
  MENUBUTTONV1_TEST_COMPONENT,
  HOMEPAGE_MENUBUTTONV1_BUTTON,
  MENUBUTTONV1_NO_A11Y_LABEL_COMPONENT,
} from '../consts';
import { BasePage, By } from '../../common/BasePage';

class MenuButtonV1PageObject extends BasePage {
  /*****************************************/
  /**************** Getters ****************/
  /*****************************************/
  get _testPage() {
    return By(MENUBUTTONV1_TESTPAGE);
  }

  get _pageName() {
    return MENUBUTTONV1_TESTPAGE;
  }

  get _primaryComponent() {
    return By(MENUBUTTONV1_TEST_COMPONENT);
  }

  get _secondaryComponent() {
    return By(MENUBUTTONV1_NO_A11Y_LABEL_COMPONENT);
  }

  get _pageButton() {
    return By(HOMEPAGE_MENUBUTTONV1_BUTTON);
  }
}

export default new MenuButtonV1PageObject();
