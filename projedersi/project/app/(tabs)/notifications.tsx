import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { MapPin, Clock } from 'lucide-react-native';

type Notification = {
  id: string;
  type: 'new_station' | 'refill_needed' | 'thank_you';
  title: string;
  message: string;
  timestamp: string;
  userImage: string;
  location: string;
};

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'new_station',
    title: 'Yeni Mama İstasyonu',
    message: 'Ayşe Hanım yeni bir mama istasyonu ekledi',
    timestamp: '5 dakika önce',
    userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHEC0V766_9aOFiHA8Pq5Qyp_iTmkykvH7vvsuXgmyTdAy9gH0EBaeRsK99lM5in7nJGI&usqp=CAU',
    location: 'Kocasinan, Edirne'
  },
  {
    id: '2',
    type: 'refill_needed',
    title: 'Mama Takviyesi Gerekiyor',
    message: 'Şükrüpaşa istasyonunda mama azaldı',
    timestamp: '1 saat önce',
    userImage: 'https://st2.depositphotos.com/3557671/11465/v/950/depositphotos_114656902-stock-illustration-girl-icon-cartoon-single-avatarpeaople.jpg',
    location: 'Şükrüpaşa, Edirne'
  },
  {
    id: '3',
    type: 'thank_you',
    title: 'Teşekkür Mesajı',
    message: 'Mehmet Bey mama istasyonunu doldurdu',
    timestamp: '2 saat önce',
    userImage: 'https://wallpapers.com/images/hd/generic-male-avatar-icon-piiktqtfffyzulft.jpg',
    location: 'Kıyık, Edirne'
  }
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>(SAMPLE_NOTIFICATIONS);

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity style={styles.notificationCard}>
      <Image source={{ uri: item.userImage }} style={styles.userImage} />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <View style={styles.notificationFooter}>
          <View style={styles.locationContainer}>
            <MapPin size={14} color="#666" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Clock size={14} color="#666" />
            <Text style={styles.timeText}>{item.timestamp}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
    gap: 12,
  },
  notificationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  notificationContent: {
    flex: 1,
    gap: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e65c00',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
});