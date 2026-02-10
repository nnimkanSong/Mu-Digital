// src/app/api/spin/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ข้อมูลชุดเดียวกับ Frontend เพื่อความแม่นยำ
const HOROSCOPE_POSITIONS = [
  { sequence: 1, targetDegree: 180,   name: 'เจดีย์', category: 'GOOD', description: 'เป็นคนดี จะได้เป็นที่พึ่งพาแห่ง...' },
  { sequence: 2, targetDegree: 155,  name: 'ฉัตรเงิน', category: 'GOOD', description: 'เป็นคนดี จะได้เป็นที่พึ่งพาแห่ง...' },
  { sequence: 3, targetDegree: 120,  name: 'คนคอขาด', category: 'BAD', description: 'เป็นคนอาภัพ หาที่พึ่งพาไม่ได้...' },
  { sequence: 4, targetDegree: 90,  name: 'เรือนหลวง', category: 'GOOD', description: 'จะประกอบด้วยยศถาบรรดาศักดิ์...' },
  { sequence: 5, targetDegree: 65, name: 'ปราสาท', category: 'GOOD', description: 'จะประกอบด้วยยศถาบรรดาศักดิ์...' },
  { sequence: 6, targetDegree: 30, name: 'ราหู', category: 'GOOD', description: 'น้ำใจไม่แน่นอน บทจะรักก็รัก...' },
  { sequence: 7, targetDegree: 10, name: 'ฉัตรทอง', category: 'GOOD', description: 'เป็นคนดี จะได้เป็นที่พึ่งพาแห่ง...' },
  { sequence: 8, targetDegree: -15, name: 'เทวดาขี่เต่า', category: 'GOOD', description: 'ชอบการเปลี่ยนแปลงโยกย้าย...' },
  { sequence: 9, targetDegree: -150, name: 'นาคราช', category: 'GOOD', description: 'น้ำใจไม่แน่นอน บทจะรักก็รัก...' },
  { sequence: 10, targetDegree: -120, name: 'แม่มด', category: 'GOOD', description: 'ผู้ใหญ่จะให้ความเมตตาปรานี...' },
  { sequence: 11, targetDegree: -90, name: 'พ่อหมอ', category: 'GOOD', description: 'เจ้านายและขุนนางผู้ใหญ่จะเม...' },
  { sequence: 12, targetDegree: -60, name: 'คนต้องขื่อคา', category: 'BAD', description: 'ชะตาไม่คงที่ มักดีตอนต้นและ...' },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { gender, day, month, year } = body;

    // 1. คำนวณ Logic (สูตร: ผลรวม % 12)
    const sum = day + month + year;
    const index = sum % 12; // ได้ค่า 0-11
    
    // ดึงข้อมูลผลลัพธ์จาก Array
    const resultData = HOROSCOPE_POSITIONS[index];

    // 2. บันทึกลง MongoDB ผ่าน Prisma
    // await prisma.spinLog.create({
    //   data: {
    //     gender: gender,
    //     birthDay: Number(day),
    //     birthMonth: Number(month),
    //     birthYear: Number(year),
    //     resultName: resultData.name,
    //   },
    // });

    // 3. ส่งข้อมูลกลับไปให้ Frontend
    return NextResponse.json({
      success: true,
      data: resultData
    });

  } catch (error) {
    console.error('Error spinning wheel:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}