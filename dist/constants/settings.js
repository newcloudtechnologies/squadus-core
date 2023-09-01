"use strict";
/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsName = void 0;
var SettingsName;
(function (SettingsName) {
    SettingsName["API_Gitlab_URL"] = "API_Gitlab_URL";
    SettingsName["Accounts_AddGuestsToChats"] = "Accounts_AddGuestsToChats";
    // allow guests in channel
    SettingsName["Accounts_AllowEmailChange"] = "Accounts_AllowEmailChange";
    SettingsName["Accounts_AllowInvisibleStatusOption"] = "Accounts_AllowInvisibleStatusOption";
    SettingsName["Accounts_AllowPasswordChange"] = "Accounts_AllowPasswordChange";
    SettingsName["Accounts_AllowRealNameChange"] = "Accounts_AllowRealNameChange";
    SettingsName["Accounts_AllowUserAvatarChange"] = "Accounts_AllowUserAvatarChange";
    SettingsName["Accounts_AllowUserProfileChange"] = "Accounts_AllowUserProfileChange";
    SettingsName["Accounts_AllowUserStatusMessageChange"] = "Accounts_AllowUserStatusMessageChange";
    SettingsName["Accounts_AllowUsernameChange"] = "Accounts_AllowUsernameChange";
    SettingsName["Accounts_AvatarBlockUnauthenticatedAccess"] = "Accounts_AvatarBlockUnauthenticatedAccess";
    SettingsName["Accounts_CustomFields"] = "Accounts_CustomFields";
    SettingsName["Accounts_Directory_DefaultView"] = "Accounts_Directory_DefaultView";
    SettingsName["Accounts_EmailOrUsernamePlaceholder"] = "Accounts_EmailOrUsernamePlaceholder";
    SettingsName["Accounts_EmailVerification"] = "Accounts_EmailVerification";
    SettingsName["Accounts_Iframe_api_method"] = "Accounts_Iframe_api_method";
    SettingsName["Accounts_Iframe_api_url"] = "Accounts_Iframe_api_url";
    SettingsName["Accounts_ManuallyApproveNewUsers"] = "Accounts_ManuallyApproveNewUsers";
    SettingsName["Accounts_NamePlaceholder"] = "Accounts_NamePlaceholder";
    SettingsName["Accounts_PasswordPlaceholder"] = "Accounts_PasswordPlaceholder";
    SettingsName["Accounts_PasswordReset"] = "Accounts_PasswordReset";
    SettingsName["Accounts_RegistrationForm"] = "Accounts_RegistrationForm";
    SettingsName["Accounts_RegistrationForm_LinkReplacementText"] = "Accounts_RegistrationForm_LinkReplacementText";
    SettingsName["Accounts_ShowFormLogin"] = "Accounts_ShowFormLogin";
    SettingsName["Accounts_iframe_enabled"] = "Accounts_iframe_enabled";
    SettingsName["Allow_Save_Media_to_Gallery"] = "Allow_Save_Media_to_Gallery";
    SettingsName["Assets_favicon_512"] = "Assets_favicon_512";
    SettingsName["AutoTranslate_Enabled"] = "AutoTranslate_Enabled";
    SettingsName["CAS_enabled"] = "CAS_enabled";
    SettingsName["CAS_login_url"] = "CAS_login_url";
    SettingsName["CROWD_Enable"] = "CROWD_Enable";
    SettingsName["DeepLink_Url"] = "DeepLink_Url";
    SettingsName["DirectMesssage_maxUsers"] = "DirectMesssage_maxUsers";
    SettingsName["Discussion_enabled"] = "Discussion_enabled";
    SettingsName["E2E_Enable"] = "E2E_Enable";
    SettingsName["FEDERATION_Enabled"] = "FEDERATION_Enabled";
    SettingsName["FileUpload_MaxFileSize"] = "FileUpload_MaxFileSize";
    SettingsName["FileUpload_MediaTypeWhiteList"] = "FileUpload_MediaTypeWhiteList";
    SettingsName["Force_Screen_Lock"] = "Force_Screen_Lock";
    SettingsName["Force_Screen_Lock_After"] = "Force_Screen_Lock_After";
    SettingsName["Hide_System_Messages"] = "Hide_System_Messages";
    SettingsName["Jitsi_Domain"] = "Jitsi_Domain";
    SettingsName["Jitsi_Enable_Channels"] = "Jitsi_Enable_Channels";
    SettingsName["Jitsi_Enable_Teams"] = "Jitsi_Enable_Teams";
    SettingsName["Jitsi_Enabled"] = "Jitsi_Enabled";
    SettingsName["Jitsi_Enabled_TokenAuth"] = "Jitsi_Enabled_TokenAuth";
    SettingsName["Jitsi_SSL"] = "Jitsi_SSL";
    SettingsName["Jitsi_URL_Room_Prefix"] = "Jitsi_URL_Room_Prefix";
    SettingsName["LDAP_Enable"] = "LDAP_Enable";
    SettingsName["Livechat_request_comment_when_closing_conversation"] = "Livechat_request_comment_when_closing_conversation";
    SettingsName["Message_AllowConvertLongMessagesToAttachment"] = "Message_AllowConvertLongMessagesToAttachment";
    // Enable/disable deleting message
    SettingsName["Message_AllowDeleting"] = "Message_AllowDeleting";
    // Amount of time to allow message deleting
    SettingsName["Message_AllowDeleting_BlockDeleteInMinutes"] = "Message_AllowDeleting_BlockDeleteInMinutes";
    // Enable/disable editing message
    SettingsName["Message_AllowEditing"] = "Message_AllowEditing";
    // Amount of time to allow message editing
    SettingsName["Message_AllowEditing_BlockEditInMinutes"] = "Message_AllowEditing_BlockEditInMinutes";
    SettingsName["Message_AllowPinning"] = "Message_AllowPinning";
    SettingsName["Message_AllowStarring"] = "Message_AllowStarring";
    SettingsName["Message_AudioRecorderEnabled"] = "Message_AudioRecorderEnabled";
    SettingsName["Message_GroupingPeriod"] = "Message_GroupingPeriod";
    // Amount of max symbols for typing messages
    SettingsName["Message_MaxAllowedSize"] = "Message_MaxAllowedSize";
    SettingsName["Message_Read_Receipt_Enabled"] = "Message_Read_Receipt_Enabled";
    SettingsName["Message_Read_Receipt_Store_Users"] = "Message_Read_Receipt_Store_Users";
    // Format of message send date which represented as combination of date and time
    SettingsName["Message_TimeAndDateFormat"] = "Message_TimeAndDateFormat";
    // Format of message send date which represented as time only
    SettingsName["Message_TimeFormat"] = "Message_TimeFormat";
    SettingsName["Private_Cloud_Files_Url"] = "private_cloud-files-url";
    // Info setting about server name
    SettingsName["Site_Name"] = "Site_Name";
    // Info setting about server url
    SettingsName["Site_Url"] = "Site_Url";
    // Enable/disable displaying room's last message
    SettingsName["Store_Last_Message"] = "Store_Last_Message";
    SettingsName["Threads_enabled"] = "Threads_enabled";
    SettingsName["UI_Allow_room_names_with_special_chars"] = "UI_Allow_room_names_with_special_chars";
    // Enable/disable using "name" field instead "username"
    SettingsName["UI_Use_Real_Name"] = "UI_Use_Real_Name";
    SettingsName["UTF8_Names_Validation"] = "UTF8_Names_Validation";
    SettingsName["Video_Conference_Enabled"] = "Video_Conference_Enabled";
    SettingsName["uniqueID"] = "uniqueID";
})(SettingsName = exports.SettingsName || (exports.SettingsName = {}));
//# sourceMappingURL=settings.js.map