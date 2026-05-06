package com.mindsync

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.mindsync.modules.BatteryOptimizationPackage
import com.mindsync.modules.CallLogObserver
import com.mindsync.modules.CallLogReaderPackage
import com.mindsync.modules.NotificationListenerPackage
import com.mindsync.modules.SmsReaderPackage
import com.mindsync.modules.SyncModulePackage

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList =
        PackageList(this).packages.apply {
          add(NotificationListenerPackage())
          add(SmsReaderPackage())
          add(CallLogReaderPackage())
          add(SyncModulePackage())
          add(BatteryOptimizationPackage())
        },
    )
  }

  override fun onCreate() {
    super.onCreate()
    loadReactNative(this)
    // Process-scoped observer; lives as long as the app process. WorkManager + receivers cover the rest.
    CallLogObserver.register(this)
  }
}
