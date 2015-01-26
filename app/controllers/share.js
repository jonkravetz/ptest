var SMS_SENT     = -1,
    SMS_NOT_SENT =  0;

/**
 * Open an SMS dialog with the given message.
 * If the SMS is sent, run the onSuccess callback.
 *
 * @message {text}      the text you want to send
 * @callback {function} the funciton you want to run on success
 **/

openSmsDialog("blah", successFunction );

function openSmsDialog(message, onSuccess) {
    if (Ti.Platform.osname === 'android') {
        var intent = Ti.Android.createIntent({
            action: Ti.Android.ACTION_VIEW,
            type:   'vnd.android-dir/mms-sms'
        });
        intent.putExtra('sms_body', message);

        var _onClose = function(activityResult) {
            if (activityResult.resultCode === SMS_SENT && onSuccess) {
                onSuccess();
            }
        };

        Ti.Android.currentActivity.startActivityForResult(intent, _onClose);
    } else {
        var smsModule = require("com.omorandi");

        var smsDialog = smsModule.createSMSDialog({
            messageBody: message
        });

        if (onSuccess) {
            smsDialog.addEventListener('complete', onSuccess);
        }
    }
}

function successFunction(){
	alert('success');
}
