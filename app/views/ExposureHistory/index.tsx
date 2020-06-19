import React, { useState, useContext, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  BackHandler,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useTranslation } from 'react-i18next';

import ExposureHistoryContext from '../../ExposureHistoryContext';
import { ExposureDatum } from '../../exposureHistory';
import { Typography } from '../../components/Typography';
import ExposureDatumDetail from './ExposureDatumDetail';
import Calendar from './Calendar';
import { useStatusBarEffect, NavigationProp } from '../../navigation';

import { Icons } from '../../assets';
import { Buttons, Spacing, Typography as TypographyStyles } from '../../styles';

interface ExposureHistoryScreenProps {
  navigation: NavigationProp;
}

const ExposureHistoryScreen = ({
  navigation,
}: ExposureHistoryScreenProps): JSX.Element => {
  const { t } = useTranslation();
  const { exposureHistory } = useContext(ExposureHistoryContext);
  const [
    selectedExposureDatum,
    setSelectedExposureDatum,
  ] = useState<ExposureDatum | null>(null);

  useStatusBarEffect('dark-content');

  useEffect(() => {
    const handleBackPress = () => {
      navigation.goBack();
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [navigation]);

  const handleOnSelectDate = (datum: ExposureDatum) => {
    setSelectedExposureDatum(datum);
  };

  const handleOnPressMoreInfo = () => {};

  const titleText = t('screen_titles.exposure_history');
  const lastDaysText = t('exposure_history.last_days');
  const lastUpdatedText = 'Updated 6 hours ago';

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Typography style={styles.headerText}>{titleText}</Typography>
            <TouchableOpacity
              onPress={handleOnPressMoreInfo}
              style={styles.moreInfoButton}>
              <SvgXml xml={Icons.IconQuestionMark} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerRow}>
            <Typography style={styles.subHeaderText}>{lastDaysText}</Typography>
            <Text style={styles.subHeaderText}>{' \u2022 '}</Text>
            <Typography style={styles.subHeaderText}>
              {lastUpdatedText}
            </Typography>
          </View>
        </View>
        <View style={styles.calendarContainer}>
          <Calendar
            exposureHistory={exposureHistory}
            onSelectDate={handleOnSelectDate}
            selectedDatum={selectedExposureDatum}
          />
        </View>
        <View style={styles.detailsContainer}>
          {selectedExposureDatum ? (
            <ExposureDatumDetail exposureDatum={selectedExposureDatum} />
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.medium,
  },
  header: {},
  headerRow: {
    flexDirection: 'row',
    marginTop: Spacing.xSmall,
  },
  headerText: {
    ...TypographyStyles.header2,
    marginRight: Spacing.medium,
  },
  subHeaderText: {
    ...TypographyStyles.header4,
  },
  moreInfoButton: {
    ...Buttons.tinyTeritiaryRounded,
    minHeight: 44,
    minWidth: 44,
  },
  calendarContainer: {
    marginTop: Spacing.xxLarge,
  },
  detailsContainer: {
    flex: 1,
    marginTop: Spacing.small,
  },
});

export default ExposureHistoryScreen;