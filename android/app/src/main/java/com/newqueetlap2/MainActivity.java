package com.newqueetlap2;

import com.facebook.react.ReactActivity;
import com.oblador.vectoricons.VectorIconsPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import android.content.Intent;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "newQueetLAP2";
    }

    @Override
    public void onNewIntent (Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }
}
