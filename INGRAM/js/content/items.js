export const ITEM_DATABASE = {
  swedish_id: {
  id: "swedish_id", 
  name: "ID Card",  
  icon: '<i class="fa-solid fa-id-card"></i>',
  detailedHtml: `<div style="background: linear-gradient(180deg, #151515 0%, #0a0a0a 100%); border: 1px solid #333; border-radius: 12px; padding: 30px; max-width: 520px; margin: 0 auto; box-shadow: 0 10px 40px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.05); box-sizing: border-box; ">
    
    <!-- Scaled-Down ID Card Graphic Container -->
    <div style="background: #f4f6f9; border: 1px solid #d0d5dd; max-width: 440px; padding: 12px; color: #1d2939; border-radius: 8px; box-shadow: 0 6px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.6); margin: 0 auto 25px; text-align: left;">
      
      <!-- ID Header -->
      <div style="border-bottom: 1px solid #e4e7ec; padding-bottom: 6px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; gap: 8px; align-items: center;">
          <div style="font-size: 8px; font-weight: bold; color: #fff; background: #004b93; padding: 4px 6px; border-radius: 2px; display: flex; align-items: center; gap: 2px; border: 1px solid #003366;"><span style="color: #ffcc00;">★</span>SE<span style="color: #ffcc00;">★</span></div>
          <div>
            <div style="font-size: 12px; font-weight: bold; color: #3b2273; letter-spacing: 0.3px; line-height: 1.1;">SVERIGE SWEDEN</div>
            <div style="font-size: 8px; color: #667085; font-weight: bold; text-transform: uppercase; line-height: 1.1;">Nationellt identitetskort / Identity Card</div>
          </div>
        </div>
        <div style="width: 20px; height: 12px; border: 1px solid #a4b5d6; background: #e0e7f6; border-radius: 2px; display: flex; align-items: center; justify-content: center; position: relative;"><div style="width: 6px; height: 6px; border-radius: 50%; border: 1px solid #f4f6f9;"></div><div style="position: absolute; width: 100%; height: 1px; background: #a4b5d6; top: 50%;"></div></div>
      </div>
      
      <!-- ID Core Content Split -->
      <div style="display: flex; gap: 12px; align-items: flex-start;">
        <!-- Photo Area -->
        <div style="width: 105px; height: 130px; background: #eaecf0; border: 1px solid #d0d5dd; display: flex; align-items: center; justify-content: center; color: #98a2b3; font-size: 11px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); border-radius: 4px; flex-shrink: 0; font-weight: bold; letter-spacing: 0.5px;">[PHOTO]</div>
        
        <!-- Text Grid Columns -->
        <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
          <div><div style="color: #667085; font-size: 8px; text-transform: uppercase; font-weight: bold; line-height: 1;">Efternamn/Surname</div><div style="font-size: 12px; font-weight: bold; color: #101828; letter-spacing: 0.2px;">SVALANDER</div></div>
          <div><div style="color: #667085; font-size: 8px; text-transform: uppercase; font-weight: bold; line-height: 1;">Förnamn/Given names</div><div style="font-size: 11px; font-weight: bold; color: #101828;">INGRAM SIGFRID</div></div>
          
          <div style="display: flex; gap: 8px;">
            <div style="flex: 1;"><div style="color: #667085; font-size: 8px; text-transform: uppercase; font-weight: bold; line-height: 1;">Kön/Sex</div><div style="font-size: 11px; color: #101828; font-weight: 500;">M</div></div>
            <div style="flex: 2;"><div style="color: #667085; font-size: 8px; text-transform: uppercase; font-weight: bold; line-height: 1;">Nationalitet</div><div style="font-size: 11px; color: #101828; font-weight: 500;">SVENSK/SWE</div></div>
          </div>
          
          <div><div style="color: #667085; font-size: 8px; text-transform: uppercase; font-weight: bold; line-height: 1;">Personnr</div><div style="font-size: 11px; font-weight: bold; color: #101828;">19990822-4837</div></div>
        </div>
        
        <!-- Right Column Data -->
        <div style="width: 100px; display: flex; flex-direction: column; gap: 6px; flex-shrink: 0;">
          <div><div style="color: #667085; font-size: 8px; text-transform: uppercase; font-weight: bold; line-height: 1;">Kortnr</div><div style="font-size: 11px; color: #101828; font-weight: 500;">XA7294013</div></div>
          <div><div style="color: #667085; font-size: 8px; text-transform: uppercase; font-weight: bold; line-height: 1;">Födelsedatum</div><div style="font-size: 11px; color: #101828; font-weight: 500;">22 AUG 99</div></div>
          <div><div style="color: #667085; font-size: 8px; text-transform: uppercase; font-weight: bold; line-height: 1;">Giltig till</div><div style="font-size: 11px; color: #101828; font-weight: 500;">14 JUN 27</div></div>
          
          <!-- Secondary Ghost Image Box -->
          <div style="width: 44px; height: 44px; border: 1px dashed #ced4da; background: #f8f9fa; align-self: flex-end; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #475467; font-size: 7px; font-family: monospace; font-weight: bold; text-align: center; line-height: 1.2; margin-top: 2px;"><div>22 08</div><div>1999</div></div>
        </div>
      </div>
      
      <!-- ID Footer Row -->
      <div style="margin-top: 8px; padding-top: 6px; border-top: 1px solid #e4e7ec; display: flex; justify-content: space-between; align-items: flex-end;">
        <div><div style="color: #667085; font-size: 8px; text-transform: uppercase; font-weight: bold; line-height: 1;">Innehavarens namnteckning</div><div style="font-family: 'Courier New', monospace; font-size: 14px; color: #344054; font-style: italic; padding-left: 2px; font-weight: bold; line-height: 1.2;">I. Svalander</div></div>
        <div style="color: #98a2b3; font-size: 9px; font-weight: bold; letter-spacing: 0.5px;">SWE</div>
      </div>
    </div>

    <!-- Inventory Details Section -->
    <h3 style="color: #fff; font-size: 14px; font-weight: bold; text-transform: uppercase; text-align: center; letter-spacing: 0.5px; margin: 0 0 10px;">Identity Card</h3>
    
    <div style="font-size: 13px; line-height: 1.6; color: #ccc; margin-bottom: 15px; text-align: left;">
      A Swedish national identity card issued by the police department. The plastic is smooth, showing minor scuffs along the edges from regular wear.
    </div>
    
    <div style="background: #0f0f0f; border-left: 3px solid #86a66d; padding: 12px 15px; margin: 15px 0; font-size: 12px; color: #86a66d; font-style: italic; line-height: 1.5; text-align: left;">
      "Ingram Sigfrid Svalander. A legal identity tied to a life you can barely reach right now. It feels strange seeing your own face staring back from a piece of official plastic."
    </div>
    
    <div style="font-size: 10px; color: #555; margin-top: 15px; text-transform: uppercase; letter-spacing: 0.5px; text-align: left; font-weight: bold;">
      Official Documentation • Verification Asset
    </div>
    
  </div>`
},
  apartment_key: {
  id: "apartment_key",
  name: "Housekey",
  icon: '<i class="fa-solid fa-key"></i>',
  detailedHtml: `<div style="background: linear-gradient(180deg, #151515 0%, #0a0a0a 100%); border: 1px solid #333; border-radius: 12px; padding: 40px; max-width: 520px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; box-shadow: 0 10px 40px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.05); box-sizing: border-box;">
    
    <!-- TOP ROW: Key & Keychain CSS Graphic -->
    <div style="position: relative; height: 160px; display: flex; align-items: center; justify-content: center; width: 100%;">
      
      <!-- Key Assembly Container -->
      <div style="position: relative; display: flex; align-items: center; transform: rotate(-10deg);">
        
        <!-- 1. KEYCHAIN TAG (Rectangular Plastic) -->
        <div style="width: 130px; height: 65px; background: linear-gradient(135deg, rgba(30,30,35,0.85) 0%, rgba(15,15,18,0.95) 100%); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; box-shadow: -8px 12px 20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: flex-end; padding-right: 15px; box-sizing: border-box; position: relative;">
          <!-- Small brass eyelet hole inside the tag -->
          <div style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 12px; height: 12px; background: #0a0a0a; border: 2px solid #b89742; border-radius: 50%; box-shadow: inset 0 1px 2px rgba(0,0,0,0.8);"></div>
          <!-- Room/Label engraving simulation on the tag -->
          <div style="font-family: monospace; font-size: 9px; color: #444; text-transform: uppercase; letter-spacing: 1px; border: 1px dashed #222; padding: 4px 8px; border-radius: 3px;">Room 402</div>
        </div>
        
        <!-- 2. METAL SPLIT RING (Connects Tag to Key) -->
        <div style="position: absolute; left: -5px; width: 42px; height: 42px; border: 4px solid #999; border-top-color: #bbb; border-bottom-color: #666; border-radius: 50%; background: transparent; box-shadow: -3px 5px 8px rgba(0,0,0,0.5); z-index: 2; pointer-events: none;"></div>
        
        <!-- 3. BRASS KEY GRAPHIC -->
        <div style="position: absolute; left: 22px; display: flex; align-items: center; z-index: 3;">
          
          <!-- Key Head (Bow) -->
          <div style="width: 52px; height: 52px; background: linear-gradient(135deg, #d4b359 0%, #b89742 40%, #8c6f2d 100%); border-radius: 50%; border: 1px solid #705721; box-shadow: -4px 6px 12px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.4); position: relative; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <!-- Center Hole of Key Head -->
            <div style="width: 16px; height: 16px; background: #151515; border-radius: 50%; box-shadow: inset 0 2px 4px rgba(0,0,0,0.8), 0 1px 1px rgba(255,255,255,0.2); border: 1px solid #55431a;"></div>
          </div>
          
          <!-- Key Collar/Stop -->
          <div style="width: 10px; height: 24px; background: linear-gradient(90deg, #b89742 0%, #8c6f2d 100%); border: 1px solid #705721; border-radius: 2px; margin-left: -2px; flex-shrink: 0; box-shadow: -2px 3px 5px rgba(0,0,0,0.3);"></div>
          
          <!-- Key Shaft & Teeth (Tang) -->
          <div style="position: relative; height: 14px; width: 75px; background: linear-gradient(180deg, #d4b359 0%, #b89742 40%, #8c6f2d 100%); border: 1px solid #705721; border-left: none; border-radius: 0 2px 2px 0; box-shadow: 0 4px 8px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.3); display: flex; align-items: flex-end;">
            
            <!-- Shaved Key Teeth Cuts (Bottom side cuts) -->
            <div style="position: absolute; bottom: -5px; right: 12px; width: 10px; height: 6px; background: #151515; transform: rotate(45deg); border-left: 1px solid #705721;"></div>
            <div style="position: absolute; bottom: -4px; right: 26px; width: 8px; height: 6px; background: #151515; transform: rotate(45deg); border-left: 1px solid #705721;"></div>
            <div style="position: absolute; bottom: -6px; right: 38px; width: 12px; height: 7px; background: #151515; transform: rotate(45deg); border-left: 1px solid #705721;"></div>
            <div style="position: absolute; bottom: -3px; right: 54px; width: 7px; height: 5px; background: #151515; transform: rotate(45deg); border-left: 1px solid #705721;"></div>
            
            <!-- Horizontal warding groove line along the blade -->
            <div style="position: absolute; top: 4px; left: 0; right: 6px; height: 2px; background: #66501f; border-bottom: 1px solid rgba(255,255,255,0.15);"></div>
          </div>
          
        </div>
      </div>
      
    </div>

    <!-- BOTTOM ROW: Label, Specification, and Narrative Blocks -->
    <div style="width: 100%; display: flex; flex-direction: column; text-align: left;">
      <h3 style="color: #fff; font-size: 14px; font-weight: bold; text-transform: uppercase; text-align: center; letter-spacing: 0.5px; margin: 0 0 10px;">Brass Housekey</h3>
      
      <div style="font-size: 13px; line-height: 1.6; color: #ccc; margin-bottom: 15px;">
        A heavy, standard pin-tumbler key with a dull gold finish. The metallic tang leaves a faint scent of copper on your fingertips when you hold it tight.
      </div>
      
      <div style="background: #0f0f0f; border-left: 3px solid #86a66d; padding: 12px 15px; margin: 15px 0; font-size: 12px; color: #86a66d; font-style: italic; line-height: 1.5;">
        "It turns the double-cylinder deadbolt on the front door. It fits perfectly into the slot, a simple mechanical guarantee that the outside world stays out, and you stay exactly where he put you."
      </div>
      
      <div style="font-size: 10px; color: #555; margin-top: 15px; text-transform: uppercase; letter-spacing: 0.5px; text-align: left; font-weight: bold;">
        Security Hardware • Boundary Marker
      </div>
    </div>
    
  </div>`
},
  phone: {
  id: "phone", 
  name: "iPhone", 
  icon: '<i class="fa-solid fa-mobile-screen"></i>',
  detailedHtml: `<div style="background: linear-gradient(180deg, #151515 0%, #0a0a0a 100%); border: 1px solid #333; border-radius: 12px; padding: 30px; max-width: 620px; margin: 0 auto; display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 40px; box-shadow: 0 10px 40px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.05);; box-sizing: border-box;">
    
    <!-- LEFT COLUMN: Phone Graphic Chassis -->
    <div style="background: #2d1f3d; border-radius: 32px; padding: 6px; box-shadow: 0 12px 36px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1); position: relative; width: 170px; flex-shrink: 0;">
      <!-- Phone body -->
      <div style="background: #0d0d0d; border-radius: 25px; padding: 4px; border: 1px solid #1a1a1a;">
        <!-- Screen (off/black) -->
        <div style="background: #000; border-radius: 20px; aspect-ratio: 9/19; position: relative; overflow: hidden;">
          <!-- Subtle reflection -->
          <div style="position: absolute; top: 0; left: 0; right: 0; height: 40%; background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%); pointer-events: none;"></div>
          
          <!-- Dynamic Island / Notch area -->
          <div style="position: absolute; top: 11px; left: 50%; transform: translateX(-50%); width: 33%; height: 13px; background: #000; border-radius: 10px; border: 1px solid #1a1a1a;"></div>
        </div>
      </div>
      
      <!-- Side button / Power -->
      <div style="position: absolute; right: -3px; top: 95px; width: 3px; height: 45px; background: #1a1a1a; border-radius: 0 3px 3px 0;"></div>
      
      <!-- Ring/Silent Switch -->
      <div style="position: absolute; left: -3px; top: 55px; width: 3px; height: 16px; background: #1a1a1a; border-radius: 3px 0 0 3px;"></div>
      
      <!-- Volume buttons -->
      <div style="position: absolute; left: -3px; top: 82px; width: 3px; height: 28px; background: #1a1a1a; border-radius: 3px 0 0 3px;"></div>
      <div style="position: absolute; left: -3px; top: 118px; width: 3px; height: 28px; background: #1a1a1a; border-radius: 3px 0 0 3px;"></div>
    </div>
    
    <!-- RIGHT COLUMN: Label, Specifications, Narrative Blocks -->
    <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; text-align: left;">
      <h3 style="color: #fff; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px;">iPhone 14 Pro</h3>
      <div style="font-size: 11px; color: #555; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 15px; font-weight: bold;">Deep Purple · 256GB</div>
      
      <div style="font-size: 13px; line-height: 1.6; color: #ccc; margin-bottom: 15px;">
        The screen is dark. The matte glass back is cold, free of fingerprints, wiped down with the same precision as the rest of the house.
      </div>

      <div style="background: #0f0f0f; border-left: 3px solid #86a66d; padding: 12px 15px; margin: 10px 0 15px 0; font-size: 12px; color: #86a66d; font-style: italic; line-height: 1.5;">
        "Rémy's last text is still unread somewhere inside. You want to press the power button, to see the screen bloom to life, but your thumb hovers over the cold metal. You aren't sure if you're allowed to."
      </div>

      <div style="font-size: 10px; color: #555; text-transform: uppercase; letter-spacing: 0.5px; font-weight: bold;">
        Personal Property • Communication Locked
      </div>
    </div>
    
  </div>`
},

seroquel_bottle: {
  id: "seroquel_bottle",
  name: "Seroquel IR",
  icon: '<i class="fa-solid fa-prescription-bottle-medical"></i>',
  detailedHtml: `<div style="background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%); border: 1px solid #333; border-radius: 12px; padding: 40px; max-width: 520px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; box-shadow: 0 10px 30px rgba(0,0,0,0.8); box-sizing: border-box;">
    
    <!-- TOP ROW: Visual Assets (Bottle and Pills Side-by-Side) -->
    <div style="display: flex; flex-direction: row; align-items: flex-end; justify-content: center; gap: 40px; margin-bottom: 30px; width: 100%;">
      
      <!-- Bottle -->
      <div style="position: relative; width: 180px; height: 270px; background: linear-gradient(90deg, #f5f5f5 0%, #ffffff 20%, #f0f0f0 50%, #e8e8e8 100%); border-radius: 12px 12px 28px 28px; box-shadow: 0 6px 20px rgba(0,0,0,0.4), inset 0 -4px 8px rgba(0,0,0,0.1); display: flex; flex-direction: column; overflow: hidden; flex-shrink: 0; text-align: left;">
        
        <!-- Cap -->
        <div style="height: 42px; background: linear-gradient(180deg, #ffffff 0%, #f0f0f0 50%, #e0e0e0 100%); border-bottom: 1px solid #ccc; box-shadow: 0 2px 4px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center;">
          <div style="width: 70%; height: 4px; background: #ddd; border-radius: 2px;"></div>
        </div>
        
        <!-- Label Area -->
        <div style="flex: 1; background: linear-gradient(180deg, #ffffff 0%, #f8f8f8 100%); margin: 12px 10px 18px 10px; border-radius: 6px; border: 1px solid #e0e0e0; padding: 14px; display: flex; flex-direction: column; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
          
          <!-- Pharma Header -->
          <div style="border-bottom: 3px solid #c41e3a; padding-bottom: 6px; margin-bottom: 10px;">
            <div style="font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 0.8px; font-weight: bold;">Rx Only</div>
            <div style="font-size: 18px; font-weight: bold; color: #c41e3a; letter-spacing: -0.5px; line-height: 1.2;">SEROQUEL®</div>
          </div>
          
          <!-- Drug Info -->
          <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
            <div style="font-size: 12px; color: #333; font-weight: bold;">Quetiapine Fumarate</div>
            <div style="font-size: 15px; color: #000; font-weight: bold; margin-top: 2px;">400 mg</div>
            <div style="font-size: 10px; color: #666; margin-top: 10px; line-height: 1.4;">
              60 Tablets<br>
              Take as directed<br>
              <span style="color: #999; font-size: 9px; display: inline-block; margin-top: 4px;">Ref: 2847-01</span>
            </div>
          </div>
          
          <!-- Warning Pin -->
          <div style="border-top: 1px solid #ddd; padding-top: 8px; margin-top: 8px;">
            <div style="font-size: 9px; color: #c41e3a; text-transform: uppercase; font-weight: bold; letter-spacing: 0.3px;">May cause drowsiness</div>
          </div>
        </div>
        
        <!-- Shine Overlay -->
        <div style="position: absolute; top: 45px; right: 12px; width: 12px; height: 60%; background: linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%); border-radius: 6px; pointer-events: none;"></div>
      </div>
      
      <!-- Pills Graphics Area -->
      <div style="display: flex; flex-direction: column; gap: 14px; align-items: center; padding-bottom: 15px; flex-shrink: 0;">
        
        <!-- Pill 1 -->
        <div style="width: 52px; height: 28px; background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #e8e8e8 100%); border-radius: 50%; box-shadow: 0 5px 10px rgba(0,0,0,0.3), inset 0 -3px 6px rgba(0,0,0,0.1), inset 0 3px 6px rgba(255,255,255,0.8); border: 1px solid #ddd; position: relative;">
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 34px; height: 16px; border: 1px solid rgba(0,0,0,0.08); border-radius: 50%; opacity: 0.3;"></div>
          <div style="position: absolute; top: 4px; left: 10px; width: 10px; height: 5px; background: rgba(255,255,255,0.8); border-radius: 50%; transform: rotate(-45deg);"></div>
          <div style="position: absolute; bottom: 4px; right: 12px; font-size: 8px; color: rgba(0,0,0,0.25); font-weight: bold; font-family: sans-serif; letter-spacing: 0.5px;">400</div>
        </div>
        
        <!-- Pill 2 -->
        <div style="width: 52px; height: 28px; background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #e8e8e8 100%); border-radius: 50%; box-shadow: 0 5px 10px rgba(0,0,0,0.3), inset 0 -3px 6px rgba(0,0,0,0.1), inset 0 3px 6px rgba(255,255,255,0.8); border: 1px solid #ddd; position: relative; transform: rotate(15deg);">
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 34px; height: 16px; border: 1px solid rgba(0,0,0,0.08); border-radius: 50%; opacity: 0.3;"></div>
          <div style="position: absolute; top: 4px; left: 10px; width: 10px; height: 5px; background: rgba(255,255,255,0.8); border-radius: 50%; transform: rotate(-45deg);"></div>
          <div style="position: absolute; bottom: 4px; right: 12px; font-size: 8px; color: rgba(0,0,0,0.25); font-weight: bold; font-family: sans-serif; letter-spacing: 0.5px;">400</div>
        </div>
        
        <div style="font-size: 12px; color: #666; margin-top: 10px; font-style: italic; text-align: center; max-width: 120px; line-height: 1.4;">
          Horse pills. 400mg each.
        </div>
      </div>
    </div>

    <!-- BOTTOM ROW: Label, Specification, and Narrative Block Area -->
    <div style="width: 100%; display: flex; flex-direction: column; text-align: left;">
      <h3 style="color: #fff; font-size: 14px; font-weight: bold; text-transform: uppercase; text-align: center; letter-spacing: 0.5px; margin: 0 0 10px;">Seroquel IR</h3>
      
      <div style="font-size: 13px; line-height: 1.6; color: #ccc; margin-bottom: 15px;">
        Quetiapine Fumarate, 400mg. A factory-clean white plastic bottle containing immediate-release tablets. The cap turns too easily, the safety lock completely disabled.
      </div>
      
      <div style="background: #0f0f0f; border-left: 3px solid #86a66d; padding: 12px 15px; margin: 15px 0; font-size: 12px; color: #86a66d; font-style: italic; line-height: 1.5;">
        "Horse pills. They taste like chalk and surrender on your tongue. The chemical straightjacket takes time to fasten, but taking them means you are good. Taking them means you acknowledge the rules."
      </div>
      
      <div style="font-size: 10px; color: #555; margin-top: 15px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: bold;">
        Prescription Medication • Compliance Tool
      </div>
    </div>
    
  </div>`
},

collar: {
  id: "collar",
  name: "Ingram's Collar",
  icon: `<i class="fa-solid fa-paw"></i>`,
  detailedHtml: `<div style="background: linear-gradient(180deg, #151515 0%, #0a0a0a 100%); border: 1px solid #333; border-radius: 12px; padding: 40px; max-width: 520px; margin: 0 auto; box-shadow: 0 10px 40px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.05); box-sizing: border-box;">
    
    <!-- Graphic Display Wrapper -->
    <div style="position: relative; height: 110px; margin-bottom: 30px; display: flex; align-items: center; justify-content: center;">
      
      <!-- Leather Strap (Widened and thickened proportionally) -->
      <div style="width: 440px; height: 42px; background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 50%, #0d0d0d 100%); border-radius: 6px; box-shadow: 0 3px 12px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.1); position: relative; border: 1px solid #333;">
        
        <!-- Dashed Stitching Lines (Adjusted for new height) -->
        <div style="position: absolute; top: 5px; left: 12px; right: 12px; height: 1px; border-top: 1px dashed #444;"></div>
        <div style="position: absolute; bottom: 5px; left: 12px; right: 12px; height: 1px; border-bottom: 1px dashed #444;"></div>
        
        <!-- D-Ring Leash Attachment (Scaled up) -->
        <div style="position: absolute; left: 45px; top: 50%; transform: translateY(-50%); width: 20px; height: 30px; border: 4px solid #666; border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.3); background: linear-gradient(135deg, #888 0%, #555 100%);"></div>
        
        <!-- Engraved Nameplate (Enlarged with crisper typography setup) -->
        <div style="position: absolute; right: 65px; top: 50%; transform: translateY(-50%); width: 170px; height: 26px; background: linear-gradient(180deg, #c0c0c0 0%, #808080 50%, #606060 100%); border-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.4); display: flex; align-items: center; justify-content: center; border: 1px solid #555;">
          <div style="font-family: 'Times New Roman', serif; font-size: 11px; color: #222; font-weight: bold; letter-spacing: 0.5px; text-shadow: 0 1px 0 rgba(255,255,255,0.4); font-variant: small-caps;">Property of Rémy Lavergne</div>
        </div>
        
        <!-- Metal Strap Loop/Keeper -->
        <div style="position: absolute; right: 15px; top: 50%; transform: translateY(-50%); width: 22px; height: 34px; background: linear-gradient(180deg, #888 0%, #555 100%); border-radius: 3px; box-shadow: 0 1px 4px rgba(0,0,0,0.5);"></div>
      </div>
      
    </div>

    <!-- Text Information Content -->
    <h3 style="color: #fff; font-size: 16px; font-weight: bold; text-transform: uppercase; text-align: center; letter-spacing: 0.8px; margin: 0 0 12px;">Your Collar</h3>
    
    <div style=" font-size: 14px; line-height: 1.6; color: #ccc; margin-bottom: 20px; text-align: left;">
      Black leather with surgical steel hardware. The tag is small, cold against your throat, engraved with medical precision.
    </div>
    
    <div style=" background: #0f0f0f; border-left: 3px solid #86a66d; padding: 15px 18px; margin: 20px 0; font-size: 13px; color: #86a66d; font-style: italic; line-height: 1.5; text-align: left;">
      "You feel safest wearing it. The weight reminds you who you belong to. Without it, your neck feels naked, vulnerable—like something essential is missing."
    </div>
    
    <div style=" font-size: 11px; color: #555; margin-top: 20px; text-transform: uppercase; letter-spacing: 0.8px; text-align: left; font-weight: bold;">
      24/7 Wear Required • Removal Prohibited
    </div>
    
  </div>`
}

};