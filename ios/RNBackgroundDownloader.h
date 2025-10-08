#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

typedef void (^CompletionHandler)();

@interface RNBackgroundDownloader : RCTEventEmitter <RCTBridgeModule, NSURLSessionDelegate, NSURLSessionDownloadDelegate>

    @property(nonatomic, assign) BOOL hasListeners;
    @property(nonatomic, strong) NSMutableArray<NSDictionary *> *pendingEvents;

+ (void)setCompletionHandlerWithIdentifier:(NSString *)identifier completionHandler:(CompletionHandler)completionHandler;

@end
