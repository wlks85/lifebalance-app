package com.receipt;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
// import org.devio.rn.splashscreen.SplashScreen;


public class MainActivity extends ReactActivity {

    @Override
    protected String getMainComponentName() {
        return "Receipt";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new DefaultReactActivityDelegate(
                this,
                getMainComponentName(),
                isFabricEnabled()
        );
    }

    private boolean isFabricEnabled() {

        // DefaultNewArchitectureEntryPoint.fabricEnabled()
        return false;
    }
}
