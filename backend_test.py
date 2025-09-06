#!/usr/bin/env python3
"""
Backend Test Suite for CãoFidèle API
Tests the priority endpoints as specified in test_result.md
"""

import requests
import json
import os
import sys
from typing import Dict, Any

# Get the backend URL from frontend .env file
def get_backend_url():
    """Get backend URL from frontend .env file"""
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"❌ Error reading frontend .env: {e}")
        return None
    return None

class CaoFideleAPITester:
    def __init__(self):
        self.base_url = get_backend_url()
        if not self.base_url:
            raise ValueError("Could not get REACT_APP_BACKEND_URL from frontend/.env")
        
        self.api_url = f"{self.base_url}/api"
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
        
        print(f"🔗 Testing backend at: {self.api_url}")
        
    def test_health_check(self) -> Dict[str, Any]:
        """Test GET /api/ - Health check endpoint"""
        print("\n🔍 Testing Health Check Endpoint...")
        
        try:
            response = self.session.get(f"{self.api_url}/")
            
            result = {
                'endpoint': 'GET /api/',
                'status_code': response.status_code,
                'success': response.status_code == 200,
                'response_time': response.elapsed.total_seconds(),
                'error': None,
                'data': None
            }
            
            if response.status_code == 200:
                try:
                    data = response.json()
                    result['data'] = data
                    print(f"✅ Health check passed: {data.get('message', 'No message')}")
                    print(f"   Status: {data.get('status', 'Unknown')}")
                except json.JSONDecodeError:
                    result['error'] = "Invalid JSON response"
                    print(f"❌ Health check returned invalid JSON")
            else:
                result['error'] = f"HTTP {response.status_code}: {response.text}"
                print(f"❌ Health check failed: HTTP {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            result = {
                'endpoint': 'GET /api/',
                'status_code': None,
                'success': False,
                'response_time': None,
                'error': str(e),
                'data': None
            }
            print(f"❌ Health check connection error: {e}")
            
        return result
    
    def test_get_testimonials(self) -> Dict[str, Any]:
        """Test GET /api/testimonials - Get approved testimonials"""
        print("\n🔍 Testing Get Testimonials Endpoint...")
        
        try:
            response = self.session.get(f"{self.api_url}/testimonials/")
            
            result = {
                'endpoint': 'GET /api/testimonials/',
                'status_code': response.status_code,
                'success': response.status_code == 200,
                'response_time': response.elapsed.total_seconds(),
                'error': None,
                'data': None,
                'testimonials_count': 0
            }
            
            if response.status_code == 200:
                try:
                    data = response.json()
                    result['data'] = data
                    result['testimonials_count'] = len(data) if isinstance(data, list) else 0
                    
                    print(f"✅ Testimonials retrieved successfully")
                    print(f"   Count: {result['testimonials_count']} testimonials")
                    
                    # Validate testimonial structure
                    if isinstance(data, list) and len(data) > 0:
                        first_testimonial = data[0]
                        required_fields = ['id', 'name', 'location', 'rating', 'text', 'dogName', 'breed']
                        missing_fields = [field for field in required_fields if field not in first_testimonial]
                        
                        if missing_fields:
                            result['error'] = f"Missing fields in testimonial: {missing_fields}"
                            print(f"⚠️  Missing fields in testimonial structure: {missing_fields}")
                        else:
                            print(f"   Sample testimonial: {first_testimonial['name']} - {first_testimonial['dogName']} ({first_testimonial['breed']})")
                            print(f"   Rating: {first_testimonial['rating']}/5")
                    
                except json.JSONDecodeError:
                    result['error'] = "Invalid JSON response"
                    print(f"❌ Testimonials endpoint returned invalid JSON")
            else:
                result['error'] = f"HTTP {response.status_code}: {response.text}"
                print(f"❌ Testimonials request failed: HTTP {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            result = {
                'endpoint': 'GET /api/testimonials/',
                'status_code': None,
                'success': False,
                'response_time': None,
                'error': str(e),
                'data': None,
                'testimonials_count': 0
            }
            print(f"❌ Testimonials connection error: {e}")
            
        return result
    
    def test_contact_schedule_valid(self) -> Dict[str, Any]:
        """Test POST /api/contact/schedule with valid data"""
        print("\n🔍 Testing Contact Schedule Endpoint (Valid Data)...")
        
        # Test data as specified in the review request
        test_data = {
            "name": "João Silva",
            "email": "joao@teste.com",
            "phone": "(11) 99999-9999",
            "dogName": "Rex",
            "dogBreed": "Golden Retriever",
            "dogAge": "3 anos",
            "selectedPlan": "intermediário",
            "behaviorIssues": "Ansiedade e latidos excessivos",
            "message": "Preciso de ajuda urgente com meu cão",
            "preferredContact": "whatsapp"
        }
        
        try:
            response = self.session.post(
                f"{self.api_url}/contact/schedule",
                json=test_data
            )
            
            result = {
                'endpoint': 'POST /api/contact/schedule',
                'status_code': response.status_code,
                'success': response.status_code == 200,
                'response_time': response.elapsed.total_seconds(),
                'error': None,
                'data': None,
                'test_data': test_data
            }
            
            if response.status_code == 200:
                try:
                    data = response.json()
                    result['data'] = data
                    
                    print(f"✅ Contact form submitted successfully")
                    print(f"   Success: {data.get('success', False)}")
                    print(f"   Message: {data.get('message', 'No message')}")
                    
                    # Validate response structure
                    if 'success' not in data or 'message' not in data:
                        result['error'] = "Missing required fields in response (success, message)"
                        print(f"⚠️  Response missing required fields")
                    elif not data.get('success'):
                        result['error'] = f"API returned success=false: {data.get('message')}"
                        print(f"⚠️  API returned success=false")
                    
                except json.JSONDecodeError:
                    result['error'] = "Invalid JSON response"
                    print(f"❌ Contact endpoint returned invalid JSON")
            else:
                result['error'] = f"HTTP {response.status_code}: {response.text}"
                print(f"❌ Contact form submission failed: HTTP {response.status_code}")
                if response.status_code == 422:
                    try:
                        error_data = response.json()
                        print(f"   Validation errors: {error_data}")
                    except:
                        pass
                
        except requests.exceptions.RequestException as e:
            result = {
                'endpoint': 'POST /api/contact/schedule',
                'status_code': None,
                'success': False,
                'response_time': None,
                'error': str(e),
                'data': None,
                'test_data': test_data
            }
            print(f"❌ Contact form connection error: {e}")
            
        return result
    
    def test_contact_schedule_invalid(self) -> Dict[str, Any]:
        """Test POST /api/contact/schedule with invalid data (missing required fields)"""
        print("\n🔍 Testing Contact Schedule Endpoint (Invalid Data)...")
        
        # Test data missing required fields
        invalid_data = {
            "name": "Test User",
            # Missing email, phone, dogName
            "dogBreed": "Test Breed"
        }
        
        try:
            response = self.session.post(
                f"{self.api_url}/contact/schedule",
                json=invalid_data
            )
            
            result = {
                'endpoint': 'POST /api/contact/schedule (invalid)',
                'status_code': response.status_code,
                'success': response.status_code == 422,  # Expecting validation error
                'response_time': response.elapsed.total_seconds(),
                'error': None,
                'data': None,
                'test_data': invalid_data
            }
            
            if response.status_code == 422:
                try:
                    data = response.json()
                    result['data'] = data
                    print(f"✅ Validation working correctly - rejected invalid data")
                    print(f"   Validation errors detected: {len(data.get('detail', []))} errors")
                except json.JSONDecodeError:
                    result['error'] = "Invalid JSON response for validation error"
                    print(f"❌ Validation endpoint returned invalid JSON")
            elif response.status_code == 200:
                result['success'] = False
                result['error'] = "API accepted invalid data (should have returned 422)"
                print(f"❌ API incorrectly accepted invalid data")
            else:
                result['error'] = f"Unexpected HTTP {response.status_code}: {response.text}"
                print(f"⚠️  Unexpected response: HTTP {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            result = {
                'endpoint': 'POST /api/contact/schedule (invalid)',
                'status_code': None,
                'success': False,
                'response_time': None,
                'error': str(e),
                'data': None,
                'test_data': invalid_data
            }
            print(f"❌ Contact form validation test connection error: {e}")
            
        return result
    
    def test_email_functionality(self) -> Dict[str, Any]:
        """Test email functionality by checking if EmailService is properly configured"""
        print("\n🔍 Testing Email Service Configuration...")
        
        # This is an indirect test - we'll check if the contact endpoint processes emails
        # by submitting a form and checking the response
        test_data = {
            "name": "Email Test User",
            "email": "emailtest@caofidele.com",
            "phone": "(11) 88888-8888",
            "dogName": "TestDog",
            "dogBreed": "Test Breed",
            "dogAge": "2 anos",
            "selectedPlan": "básico",
            "behaviorIssues": "Teste de email",
            "message": "Teste de funcionalidade de email",
            "preferredContact": "email"
        }
        
        try:
            response = self.session.post(
                f"{self.api_url}/contact/schedule",
                json=test_data
            )
            
            result = {
                'endpoint': 'Email Service Test',
                'status_code': response.status_code,
                'success': False,
                'response_time': response.elapsed.total_seconds(),
                'error': None,
                'data': None,
                'email_status': 'unknown'
            }
            
            if response.status_code == 200:
                try:
                    data = response.json()
                    result['data'] = data
                    
                    # Check if the response indicates successful processing
                    if data.get('success'):
                        result['success'] = True
                        result['email_status'] = 'processed'
                        print(f"✅ Email service processed request successfully")
                        print(f"   Message: {data.get('message')}")
                        
                        # Note: We can't verify actual email delivery without SMTP credentials
                        # But we can verify the service doesn't crash and processes the request
                        print(f"   Note: Actual email delivery depends on SMTP configuration")
                    else:
                        result['error'] = f"Email processing failed: {data.get('message')}"
                        result['email_status'] = 'failed'
                        print(f"❌ Email service reported failure")
                        
                except json.JSONDecodeError:
                    result['error'] = "Invalid JSON response"
                    print(f"❌ Email test returned invalid JSON")
            else:
                result['error'] = f"HTTP {response.status_code}: {response.text}"
                print(f"❌ Email test failed: HTTP {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            result = {
                'endpoint': 'Email Service Test',
                'status_code': None,
                'success': False,
                'response_time': None,
                'error': str(e),
                'data': None,
                'email_status': 'connection_error'
            }
            print(f"❌ Email test connection error: {e}")
            
        return result
    
    def run_all_tests(self) -> Dict[str, Any]:
        """Run all backend tests and return comprehensive results"""
        print("🚀 Starting CãoFidèle Backend API Tests")
        print("=" * 60)
        
        results = {
            'test_summary': {
                'total_tests': 5,
                'passed': 0,
                'failed': 0,
                'errors': []
            },
            'tests': {}
        }
        
        # Test 1: Health Check
        health_result = self.test_health_check()
        results['tests']['health_check'] = health_result
        if health_result['success']:
            results['test_summary']['passed'] += 1
        else:
            results['test_summary']['failed'] += 1
            results['test_summary']['errors'].append(f"Health Check: {health_result['error']}")
        
        # Test 2: Get Testimonials
        testimonials_result = self.test_get_testimonials()
        results['tests']['get_testimonials'] = testimonials_result
        if testimonials_result['success']:
            results['test_summary']['passed'] += 1
        else:
            results['test_summary']['failed'] += 1
            results['test_summary']['errors'].append(f"Get Testimonials: {testimonials_result['error']}")
        
        # Test 3: Contact Form (Valid Data)
        contact_valid_result = self.test_contact_schedule_valid()
        results['tests']['contact_schedule_valid'] = contact_valid_result
        if contact_valid_result['success']:
            results['test_summary']['passed'] += 1
        else:
            results['test_summary']['failed'] += 1
            results['test_summary']['errors'].append(f"Contact Form (Valid): {contact_valid_result['error']}")
        
        # Test 4: Contact Form (Invalid Data)
        contact_invalid_result = self.test_contact_schedule_invalid()
        results['tests']['contact_schedule_invalid'] = contact_invalid_result
        if contact_invalid_result['success']:
            results['test_summary']['passed'] += 1
        else:
            results['test_summary']['failed'] += 1
            results['test_summary']['errors'].append(f"Contact Form (Invalid): {contact_invalid_result['error']}")
        
        # Test 5: Email Functionality
        email_result = self.test_email_functionality()
        results['tests']['email_functionality'] = email_result
        if email_result['success']:
            results['test_summary']['passed'] += 1
        else:
            results['test_summary']['failed'] += 1
            results['test_summary']['errors'].append(f"Email Service: {email_result['error']}")
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {results['test_summary']['total_tests']}")
        print(f"✅ Passed: {results['test_summary']['passed']}")
        print(f"❌ Failed: {results['test_summary']['failed']}")
        
        if results['test_summary']['errors']:
            print(f"\n🔍 ERRORS FOUND:")
            for i, error in enumerate(results['test_summary']['errors'], 1):
                print(f"   {i}. {error}")
        
        success_rate = (results['test_summary']['passed'] / results['test_summary']['total_tests']) * 100
        print(f"\n📈 Success Rate: {success_rate:.1f}%")
        
        if success_rate >= 80:
            print("🎉 Backend API is working well!")
        elif success_rate >= 60:
            print("⚠️  Backend API has some issues but core functionality works")
        else:
            print("❌ Backend API has significant issues")
        
        return results

def main():
    """Main function to run the tests"""
    try:
        tester = CaoFideleAPITester()
        results = tester.run_all_tests()
        
        # Save results to file for analysis
        with open('/app/backend_test_results.json', 'w') as f:
            json.dump(results, f, indent=2, default=str)
        
        print(f"\n💾 Detailed results saved to: /app/backend_test_results.json")
        
        # Return appropriate exit code
        if results['test_summary']['failed'] == 0:
            sys.exit(0)  # All tests passed
        else:
            sys.exit(1)  # Some tests failed
            
    except Exception as e:
        print(f"❌ Critical error running tests: {e}")
        sys.exit(2)

if __name__ == "__main__":
    main()