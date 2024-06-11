import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, SectionList } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { colors } from '../../assets/styles/commonColors';
import commonStyles from '../../assets/styles/commonStyles';

const TrackApplicationResultScreen = ({ route }: { route: any }) => {
  const { applicationData } = route.params;

  const RenderUserItem = ({ item, index }: 
    { 
      item: { 
        key: string
        text: string 
      }
      index: number }) => {
    return (
      <View style={styles.FlatListItem}>
        <Text style={styles.ItemKeyText}>{item.key}</Text>
        <Text style={styles.ItemValueText}>{item.text}</Text>
      </View>
    )
  }

  const RenderStatusItem = ({ item, index }: 
    { 
      item: { 
        stage_no: number
        stage_title: string
        stage_flag: number 
      }
      index: number 
    }) => {
    const circleColor = item.stage_flag === 1 ? 'orange' : 'grey';
    //console.log(index)
    const upperLine = index !== 0;
    const lowerLine = index !== applicationData.data.result.stages.length - 1;

    return (
      <View style={styles.NodeRow}>

        <View style={styles.Node}>
          {!upperLine && <View style={{ width: 2, height: 10.1 }} />}
          {upperLine && <View style={[styles.Line, { backgroundColor: circleColor }]} />}

          <View style={[styles.Circle, { backgroundColor: circleColor }]}>
            <Text style={styles.NodeCircleText}>{item.stage_no}</Text>
          </View>

          {lowerLine && <View style={[styles.Line, { backgroundColor: circleColor }]} />}
          {!lowerLine && <View style={{ width: 2, height: 10.1 }} />}
        </View>

        <View>
          <Text style={[styles.NodeText, commonStyles.HeaderText]}>{item.stage_title}</Text>
        </View>

      </View>
    );
  };

  const renderItem = ({ item, section, index }: 
    { 
      item: any, 
      section: any, 
      index : number 
    }) => {
      //console.log("BRB", index)
    if (section.title === 'Application Info') {
      return <RenderUserItem item={item} index={index} />;
    } else if (section.title === 'Stages Status') {
      return <RenderStatusItem item={item} index={index} />;
    }
    return null
  }

  const ItemSeparator = () => {
    return <View style={styles.separator} />;
  }

  const sectionSeparator = () => {
    return <View style={{ height: 15 }} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={commonStyles.Container}>
        <View style={styles.InnerView}>

          <Text style={commonStyles.NameHeaderText}>{applicationData.data.result.consumer_name}</Text>

          <SectionList
            sections={[
              { title: 'Application Info', data: applicationData.data.result.application_data },
              { title: 'Stages Status', data: applicationData.data.result.stages },
            ]}
            renderItem={({ item, section, index }) => renderItem({ item, section, index })}
            ItemSeparatorComponent={({ sectionIndex }) => (sectionIndex === 0 ? <ItemSeparator /> : null)}
            SectionSeparatorComponent={sectionSeparator}
            ListFooterComponent={() => (
              <View style={styles.ButtonsRow}>
                <Button mode='contained' style={commonStyles.RowButtons}>
                  View All
                </Button>
                <Button mode='contained' style={commonStyles.RowButtons}>
                  Last Comment
                </Button>
              </View>
            )}
          />
          
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default TrackApplicationResultScreen;

const styles = StyleSheet.create({
  InnerView: {
    flex: 1,
  },
  FlatListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.LightGrey,
  },
  ItemKeyText: {
    flex : 1,
    fontSize: 16,
    color: colors.BlackText,
  },
  ItemValueText: {
    flex : 1,
    fontSize: 16,
    color: colors.BlackText,
  },
  separator: {
    height: 1,
    backgroundColor: colors.LightGrey,
  },
  Line: {
    width: 2,
    height: 10,
    backgroundColor: colors.DarkBackground,
  },
  Circle: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Node: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  NodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  NodeText: {
    marginStart: 10,
    color: colors.BlackText,
  },
  NodeCircleText: {
    fontWeight: 'bold',
    color: colors.whiteText,
  },
  ButtonsRow: {
    flexDirection: 'row',
  },
});
