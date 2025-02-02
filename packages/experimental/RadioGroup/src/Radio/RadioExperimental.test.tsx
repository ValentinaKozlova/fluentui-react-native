import * as React from 'react';
import { Radio } from './Radio';
import * as renderer from 'react-test-renderer';
import { checkRenderConsistency, checkReRender } from '@fluentui-react-native/test-tools';

describe('Radio component tests', () => {
  it('Radio default', () => {
    const tree = renderer.create(<Radio value="key1" label="Default Radio" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Radio disabled', () => {
    const tree = renderer.create(<Radio disabled value="key1" label="Disabled Radio" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Radio simple rendering does not invalidate styling', () => {
    checkRenderConsistency(() => <Radio value="key1" label="Default Radio" />, 2);
  });

  /* Re-render test for depth 2 is blocked and will need to be added after issue is resolved.
  The test is blocked due to an upstream issue where the blur function in Pressable is a new instance between renders.  */
  it('Radio re-renders correctly', () => {
    checkReRender(() => <Radio value="key1" label="Render twice" />);
  });
});
