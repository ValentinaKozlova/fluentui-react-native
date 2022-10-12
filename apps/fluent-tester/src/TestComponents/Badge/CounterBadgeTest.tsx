/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState, useCallback } from 'react';
import { View, TextInput } from 'react-native';
import { CounterBadge } from '@fluentui-react-native/badge';
import { ToggleButton } from '@fluentui/react-native';
import { commonTestStyles as commonStyles } from '../Common/styles';

export const CounterBadgeTest: React.FunctionComponent = () => {
  const [badgeContent, setBadgeContent] = useState('');
  const [count, setCount] = useState<number>(77);
  const [showDot, setShowDot] = useState(false);
  const [showZero, setShowZero] = useState(false);
  const [overflowCount, setOverflowCount] = useState<number>(99);

  const onContentChange = useCallback((e) => setBadgeContent(e.nativeEvent.text), []);
  const onCountChange = useCallback((e) => setCount(parseInt(e.nativeEvent.text)), []);
  const onOverflowCountChange = useCallback((e) => setOverflowCount(parseInt(e.nativeEvent.text)), []);
  const onShowDotChange = useCallback(() => setShowDot(!showDot), [showDot, setShowDot]);
  const onShowZeroChange = useCallback(() => setShowZero(!showZero), [showZero, setShowZero]);
  return (
    <View style={{ flexDirection: 'row' }}>
      <View>
        <TextInput
          style={commonStyles.textBox}
          accessibilityLabel="Text content"
          placeholder="Text content"
          blurOnSubmit={true}
          onSubmitEditing={onContentChange}
        />
        <TextInput
          style={commonStyles.textBox}
          accessibilityLabel="Count"
          placeholder="Count"
          blurOnSubmit={true}
          onSubmitEditing={onCountChange}
        />
        <TextInput
          style={commonStyles.textBox}
          accessibilityLabel="Overflow Count"
          placeholder="Overflow Count"
          blurOnSubmit={true}
          onSubmitEditing={onOverflowCountChange}
        />
        <ToggleButton onClick={onShowDotChange} checked={showDot}>
          Set {showDot ? ' Regular CounterBagde' : ' Dot Badge'}
        </ToggleButton>
        <ToggleButton onClick={onShowZeroChange} checked={showZero}>
          Set {showZero ? ' Hide Badge on zero' : ' Show Badge on zero'}
        </ToggleButton>
      </View>
      <View style={{ padding: 40 }}>
        <CounterBadge count={count} dot={showDot} showZero={showZero} size="large" overflowCount={overflowCount}>
          {badgeContent}
        </CounterBadge>
      </View>
    </View>
  );
};
