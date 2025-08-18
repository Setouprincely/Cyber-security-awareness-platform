import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface CertificateData {
  userName: string;
  courseName: string;
  completionDate: string;
  score: number;
  totalQuestions: number;
}

export async function generateCertificate(data: CertificateData): Promise<string> {
  // Create a temporary div for the certificate template
  const certificateDiv = document.createElement('div');
  certificateDiv.innerHTML = `
    <div id="certificate" style="width: 800px; height: 600px; padding: 40px; background: linear-gradient(45deg, #1a1a1a 0%, #2d2d2d 100%); color: white; font-family: Arial;">
      <div style="border: 2px solid #3B82F6; padding: 20px; height: 100%; position: relative; background: rgba(59, 130, 246, 0.1);">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="color: #3B82F6; font-size: 48px; margin-bottom: 10px;">Certificate of Completion</h1>
          <p style="font-size: 24px; color: #9CA3AF;">Cybersecurity Awareness Training</p>
        </div>
        
        <div style="text-align: center; margin-bottom: 40px;">
          <p style="font-size: 24px; margin-bottom: 20px;">This is to certify that</p>
          <h2 style="color: #3B82F6; font-size: 36px; margin-bottom: 20px;">${data.userName}</h2>
          <p style="font-size: 24px;">has successfully completed</p>
          <h3 style="color: #3B82F6; font-size: 30px; margin: 20px 0;">${data.courseName}</h3>
          <p style="font-size: 24px;">with a score of</p>
          <h3 style="color: #3B82F6; font-size: 36px; margin: 20px 0;">${data.score}/${data.totalQuestions} (${Math.round((data.score / data.totalQuestions) * 100)}%)</h3>
        </div>
        
        <div style="position: absolute; bottom: 40px; width: calc(100% - 40px); text-align: center;">
          <p style="font-size: 18px; color: #9CA3AF;">Completed on ${data.completionDate}</p>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(certificateDiv);

  try {
    // Convert the certificate div to canvas
    const canvas = await html2canvas(certificateDiv.querySelector('#certificate')!, {
      scale: 2,
      backgroundColor: null,
    });

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [800, 600],
    });

    // Add the canvas as image to PDF
    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      0,
      0,
      800,
      600
    );

    // Generate PDF file
    const pdfOutput = pdf.output('datauristring');
    
    // Clean up
    document.body.removeChild(certificateDiv);
    
    return pdfOutput;
  } catch (error) {
    console.error('Error generating certificate:', error);
    document.body.removeChild(certificateDiv);
    throw error;
  }
}
