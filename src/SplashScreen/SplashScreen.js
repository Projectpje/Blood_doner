import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';
import {inject, observer} from 'mobx-react';
import ScreenContainer from '../Components/ScreenContainer/ScreenContainer';
import R from '../Utils/R';
import Styles from './styles';
import { UserType } from '../Utils/Images';
import { USER_TYPE } from '../Utils/Enums';

@inject("userStore")
@observer
export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animated: new Animated.Value(0),
      donateBloodAnimated: new Animated.Value(0),
      requestBloodAnimated: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const { animated, donateBloodAnimated, requestBloodAnimated } = this.state;
   

    setTimeout(() => {
      this.runAnimation(animated, 15, 1000);
      this.runAnimation(donateBloodAnimated, 0, 1000);
      this.runAnimation(requestBloodAnimated, 0, 1000);
    }, 3000);

    setTimeout(() => {
      this.navigateToScreen();
    }, 4000);


    this.runAnimation(animated, 1, 1200);
    this.runAnimation(donateBloodAnimated, 1, 1550);
    this.runAnimation(requestBloodAnimated, 1, 1700);
  }


  navigateToScreen = () => {
    const {userStore} = this.props;
    const { navigation } = this.props;

    if(userStore?.isUserLoggedIn) {

      const userType = userStore?.userType;

      if(userType === USER_TYPE.DONOR) {
        navigation.navigate("Donor")
      } else if (userType === USER_TYPE.HOSPITAL) {
        navigation.navigate("Hospital")
      }

    } else {
      navigation.navigate("Login");
    }

  }

  runAnimation = (animated, toValue, duration) => {
    Animated.timing(animated, {
      toValue,
      duration,
      easing: Easing.in,
      useNativeDriver: true,
    }).start();

  }

  imageAnimatingStyle = () => {

    const { animated } = this.state;
    const { height } = R.Dimension;

    const translationInterpolation = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [height, 0],
      extrapolate: 'clamp'
    });

    const opacityInterpolation = animated.interpolate({
      inputRange: [0,1,15],
      outputRange: [1,1,0],
      extrapolate: 'clamp'
    })

    return {
      ...Styles.logoStyle,
      transform: [{ translateY: translationInterpolation },
      { scale: animated }],
      opacity: opacityInterpolation,
    }

  }


  textAnimatedStyle = (animated) => {
    const { height } = R.Dimension;

    const translationInterpolation = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [height, 0],
      extrapolate: 'clamp'
    });


    return {
      transform: [{ translateY: translationInterpolation },
      { scale: animated }
      ]
    }
  };



  render() {

    const { donateBloodAnimated, requestBloodAnimated } = this.state;

    const imageStyle = this.imageAnimatingStyle();
    const donateBloodTextStyle = this.textAnimatedStyle(donateBloodAnimated);
    const requestBloodTextStyle = this.textAnimatedStyle(requestBloodAnimated);

    return (
      <ScreenContainer>
        <View style={Styles.containerStyle}>
          <Animated.Image
            source={R.Images.Logo}
            style={imageStyle}
            resizeMode="contain"
          />

          <Animated.Text style={[Styles.donateBloodTextStyle, donateBloodTextStyle]}>Donate Blood</Animated.Text>
          <Animated.Text style={[Styles.requestBloodTextStyle, requestBloodTextStyle]}>Request Blood</Animated.Text>
        </View>
      </ScreenContainer>
    );
  }
}
