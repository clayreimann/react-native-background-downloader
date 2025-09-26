import { Tabs } from "expo-router";
import { Button, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { download, directories, DownloadTask } from '@kesha-antonov/react-native-background-downloader'
import React, { useCallback, useState } from "react";

function ProgressBar({ progress }: { progress: number }) {
  return (
    <View style={{ width: '100%', height: 10, backgroundColor: '#ddd', borderRadius: 5 }}>
      <View style={{ width: `${progress * 100}%`, height: '100%', backgroundColor: '#007AFF', borderRadius: 5 }} />
    </View>
  );
}

export default function Index() {
  const [downloading, setDownloading] = useState(false);
  const [bytesDownloaded, setBytesDownloaded] = useState(0);
  const [bytesTotal, setBytesTotal] = useState(0);
  const [downloadTask, setDownloadTask] = useState<DownloadTask | null>(null);

  const downloadCb = useCallback(() => {
    const task = download({
      id: 'file123',
      url: 'http://ipv4.download.thinkbroadband.com/100MB.zip',
      destination: `${directories.documents}/file.zip`,
      metadata: {}
    })
    task.begin(({ expectedBytes, headers }) => {
      console.log(`Going to download ${expectedBytes} bytes!`)
      setBytesDownloaded(0);
      setBytesTotal(expectedBytes);
    })
    task.progress(({ bytesDownloaded, bytesTotal }) => {
      console.log(`Downloaded: ${bytesDownloaded / bytesTotal * 100}%`)
      setBytesDownloaded(bytesDownloaded);
      setBytesTotal(bytesTotal);
    })
    task.done(({ bytesDownloaded, bytesTotal }) => {
      console.log('Download is done!', { bytesDownloaded, bytesTotal })
      setDownloading(false);
    })
    task.error(({ error, errorCode }) => {
      console.log('Download canceled due to error: ', { error, errorCode });
      setDownloading(false);
    });
    setDownloading(true);
    setDownloadTask(task);
  }, [setBytesDownloaded, setBytesTotal, setDownloading, setDownloadTask])

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Edit app/(tabs)/index.tsx to edit this screen.</Text>
        <Button title="Download" onPress={downloadCb} />
        <Text>Downloaded: {bytesDownloaded} / {bytesTotal}</Text>
        <Text>Downloading: {downloading ? 'Yes' : 'No'}</Text>
        {/* progress bar */}
        <ProgressBar progress={bytesDownloaded / bytesTotal} />
      </View>
      <Tabs.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            // Using Expo's @expo/vector-icons for icon rendering
            // "arrow.to.down.line" is a SF Symbol, so we use Ionicons' "arrow-down" as a close match
            // If you have a custom icon set with "arrow.to.down.line", replace accordingly
            <Ionicons name="arrow-down" size={size} color={color} />
          ),
        }}
      />
    </>
  );
}
